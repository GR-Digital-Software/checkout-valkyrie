import React from 'react';

interface DividerProps {
    className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
    return (
        <div className={`h-[0.2px] bg-zinc-200 ${className}`} />
    );
};

export default Divider;