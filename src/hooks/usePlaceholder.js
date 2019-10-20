import { useState, useEffect } from 'react';

export default function usePlaceholder(currentNodeId, parentNodeId) {
    const [placeholder, setPlaceholder] = useState(null);

    useEffect(() => {
        const rootPlaceholder = `Write here.`;
        const rootChildPlaceholder = `
            Write here a very short brief of your story. Try to mention its all main
            parts. For example: After breaking up with her boyfriend, JANE moves to
            a big city to forget about him. She decides to live in an unusual
            apartment...
        `;

        if (currentNodeId === 'root') {
            setPlaceholder(rootPlaceholder);
        } else if(parentNodeId === 'root') {
            setPlaceholder(rootChildPlaceholder);
        } else {
            setPlaceholder(null);
        }
    }, [currentNodeId, parentNodeId]);

    return placeholder;
};
