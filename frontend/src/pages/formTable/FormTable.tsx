import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getFormsList, type GetFormsListType } from '@/services/formServices';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router';

export default function FormTable() {

    const [searchParams] = useSearchParams();
    const limit = searchParams.get("limit") || 4;
    const page = searchParams.get("page") || 1;
    const name = searchParams.get("name") || "";

    const params: GetFormsListType = {};
    if (limit) { params.limit = limit.toString(); }
    if (page) { params.page = page.toString(); }
    if (name) { params.name = name; }

    const [list, setList] = useState<{ uuid: string, name: string, submission_count: string }[]>([]);
    const [total, setTotal] = useState<number>(0);

    const { data, isLoading, error } = useQuery({
        queryKey: ['formTable', params.limit, params.page, params.name],
        queryFn: () => getFormsList(params),
    });

    useEffect(() => {
        setList(data?.body?.list || []);
        console.log(data?.body?.list);
        setTotal(data?.body?.total);
    }, [data])


    if (isLoading) { return (<div><p>Loading</p></div>) }
    if (error) { return (<div><p>OOps something went wrong</p></div>) }

    return (
        <div>
            <Card className="w-fit pt-0 overflow-hidden">

                <Table className="w]">
                    <TableCaption>List of forms.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-300">
                            <TableHead>Id</TableHead>
                            <TableHead>Form Name</TableHead>
                            <TableHead>Submissions</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {list && list?.map((item) => (
                            <TableRow key={item.uuid}>
                                <TableCell className="font-medium">{item.uuid}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text">{item.submission_count}</TableCell>
                                <TableCell className="text-right flex gap-3">
                                    <Button variant={"outline"} asChild>
                                        <NavLink to={`/submissions?name=${item.name}&page=1`} >View</NavLink>
                                    </Button>
                                    <Button variant={"ghost"} asChild>
                                        <NavLink target="_blank" to={`/dynamicStepForm?uuid=${item.uuid}`} >Test</NavLink>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                <Pagination className="w-full">
                    <PaginationContent>
                        {
                            Number(page) > 1 &&
                            <PaginationItem>
                                <Button disabled asChild variant={"ghost"}>
                                    <NavLink className={"flex gap-1"} to={`/forms?page=${Number(page) - 1}&limit=${limit}`}>
                                        <ChevronLeftIcon />
                                        <span className="sm:block">Prev.</span>
                                    </NavLink>
                                </Button>
                            </PaginationItem>
                        }
                        {
                            Array.from({ length: Math.ceil(total / Number(limit)) }, (_, idx) => `${++idx}`).map((_, index) => {
                                return (
                                    <PaginationItem key={index}>
                                        <Button asChild variant={page == index + 1 ? "secondary" : "outline"}>
                                            <NavLink to={`/forms?page=${index + 1}&limit=${limit}`}>
                                                {index + 1}
                                            </NavLink>
                                        </Button>
                                    </PaginationItem>
                                )
                            })
                        }
                        {
                            Number(page) < total / Number(limit) &&
                            <PaginationItem>
                                <Button asChild>
                                    <NavLink className={"flex gap-1"} to={`/forms?page=${Number(page) + 1}&limit=${limit}`}>
                                        <span className="sm:block">Next</span>
                                        <ChevronRightIcon />
                                    </NavLink>
                                </Button>
                            </PaginationItem>
                        }
                    </PaginationContent>
                </Pagination>
            </Card>

        </div>
    )
}
