import React, { ReactNode } from 'react';

const PageShell = ({ children }: { children: ReactNode }) => {
    return (
        <div className={'w-screen h-full lg:h-screen p-3 lg:p-5 box-border'}>
            <div className="w-full h-full bg-black/90 rounded-3xl overflow-hidden flex justify-center items-center lg:pl-63">
                {children}
            </div>
        </div>
    );
};

export default PageShell;
