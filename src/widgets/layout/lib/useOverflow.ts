import { useEffect, useState } from 'react';

export function useOverflow(accordionRef: React.RefObject<HTMLDivElement | null>) {
    const [hasOverflow, setHasOverflow] = useState(false);

    useEffect(() => {
        if (!accordionRef.current) return;

        const observer = new ResizeObserver(() => {
            if (accordionRef.current) {
                const hasScroll =
                    accordionRef.current.scrollHeight > accordionRef.current.clientHeight;
                setHasOverflow(hasScroll);
            }
        });

        observer.observe(accordionRef.current);

        return () => observer.disconnect();
    }, [accordionRef]);

    return hasOverflow;
}
