'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationControlsProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function PaginationControls({
                                               currentPage,
                                               totalPages,
                                               onPageChange,
                                           }: PaginationControlsProps) {
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return
        onPageChange(page)
    }

    const renderPageLinks = () => {
        const links = []

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                links.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={i === currentPage}
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(i)
                            }}
                            className={'border-none focus:bg-transparent focus:text-amber-500 hover:bg-transparent hover:text-amber-500 bg-transparent'}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            } else if (
                i === currentPage - 2 ||
                i === currentPage + 2
            ) {
                links.push(
                    <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }
        }

        return links
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(currentPage - 1)
                        }}
                    />
                </PaginationItem>

                {renderPageLinks()}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(currentPage + 1)
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
