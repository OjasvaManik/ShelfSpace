'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { SlashIcon } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

export default function BreadCrumbComponent() {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter(Boolean)

    const crumbs = pathSegments.map((segment, idx) => {
        const href = "/" + pathSegments.slice(0, idx + 1).join("/")
        const label = decodeURIComponent(segment).replace(/-/g, " ")

        return {
            href,
            label: label.charAt(0).toUpperCase() + label.slice(1),
            isLast: idx === pathSegments.length - 1,
        }
    })

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link className="md:text-lg text-sm text-amber-500 hover:text-white transition-colors" href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {crumbs.map((crumb) => (
                    <React.Fragment key={crumb.href}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {crumb.isLast ? (
                                <BreadcrumbPage className="lg:text-lg text-sm text-amber-500">{crumb.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link className="lg:text-lg text-sm text-amber-500 hover:text-white transition-colors" href={crumb.href}>
                                        {crumb.label}
                                    </Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
