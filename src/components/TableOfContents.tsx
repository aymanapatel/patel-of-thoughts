import { useState, useEffect } from 'react';

interface Heading {
    depth: number;
    slug: string;
    text: string;
}

interface Props {
    headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -66%',
                threshold: 1.0,
            }
        );

        // Observe all headings
        const headingElements = headings.map((h) => document.getElementById(h.slug)).filter(Boolean);
        headingElements.forEach((el) => el && observer.observe(el));

        return () => {
            headingElements.forEach((el) => el && observer.unobserve(el));
        };
    }, [headings]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
        e.preventDefault();
        const element = document.getElementById(slug);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // Update URL hash
            window.history.pushState(null, '', `#${slug}`);
            setActiveId(slug);
        }
    };

    // Filter to only h2 and h3
    const tocHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3);

    if (tocHeadings.length === 0) {
        return null;
    }

    return (
        <nav className="toc">
            <h3 className="toc-title">Table of Contents</h3>
            <ul className="toc-list">
                {tocHeadings.map((heading) => (
                    <li
                        key={heading.slug}
                        className={`toc-item toc-depth-${heading.depth} ${activeId === heading.slug ? 'active' : ''
                            }`}
                    >
                        <a href={`#${heading.slug}`} onClick={(e) => handleClick(e, heading.slug)}>
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
