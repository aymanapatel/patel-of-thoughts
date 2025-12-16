import { useEffect, useId, useState, type MouseEvent } from 'react';

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
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const tocPanelId = useId();

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

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
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

    const toggleToc = () => setIsOpen((prev) => !prev);

    return (
        <div className={`toc-shell ${isOpen ? 'toc-open' : 'toc-closed'}`}>
            <nav className="toc" aria-label="Table of Contents">
                <div className="toc-header">
                    <h3 className="toc-title">Table of Contents</h3>
                </div>
                <div
                    id={tocPanelId}
                    className={`toc-panel ${isOpen ? 'is-open' : 'is-closed'}`}
                    aria-hidden={!isOpen}
                >
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
                </div>
            </nav>
            <button
                type="button"
                className={`toc-toggle toc-toggle-floating ${isOpen ? 'is-open' : ''}`}
                aria-expanded={isOpen}
                aria-controls={tocPanelId}
                onClick={toggleToc}
            >
                <span className="toc-toggle-label">{isOpen ? 'Close TOC' : 'Open TOC'}</span>
                <span className={`toc-toggle-icon ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.25 4.75L15.25 11.75L8.25 18.75"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>
        </div>
    );
}
