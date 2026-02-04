import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';

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
    const [isOutOfView, setIsOutOfView] = useState<boolean>(false);
    const hasCollapsedOnScroll = useRef<boolean>(false);
    const tocPanelId = useId();
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1023px)');
        const handleMediaChange = () => {
            setIsOpen(!mediaQuery.matches);
        };

        handleMediaChange();
        mediaQuery.addEventListener('change', handleMediaChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);

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

    useEffect(() => {
        const sentinelEl = sentinelRef.current;
        if (!sentinelEl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsOutOfView(!entry.isIntersecting);
                });
            },
            {
                threshold: 0.05,
            }
        );

        observer.observe(sentinelEl);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const collapseOnFirstScroll = () => {
            if (hasCollapsedOnScroll.current) return;
            const isMobile = window.matchMedia('(max-width: 1023px)').matches;
            if (!isMobile) return;
            if (window.scrollY > 0) {
                setIsOpen(false);
                hasCollapsedOnScroll.current = true;
            }
        };

        window.addEventListener('scroll', collapseOnFirstScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', collapseOnFirstScroll);
        };
    }, []);

    const toggleToc = () => setIsOpen((prev) => !prev);

    return (
        <>
            <div className="toc-visibility-sentinel" ref={sentinelRef} aria-hidden="true" />
            <div className={`toc-shell ${isOpen ? 'toc-open' : 'toc-closed'} ${isOutOfView ? 'toc-out-of-view' : ''}`}>
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
                                    className={`toc-item toc-depth-${heading.depth} ${activeId === heading.slug ? 'active' : ''}`}
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
        </>
    );
}
