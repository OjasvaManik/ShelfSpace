'use client'

import React from 'react';
import PageShell from "@/components/custom/misc/PageShell";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

const Landing = () => {
    const handleToast = () => {
        toast("Hello")
    }

    return (
            <PageShell>
                <div>
                    <Button onClick={handleToast}>Toast</Button>
                </div>
            </PageShell>
    );
};

export default Landing;
