import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import IconStar from '../components/Icon/IconStar';

const ProviderRatings = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Laurie Fox',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasassas sas asasasasassas sas asasasasassas sas asasasasassas sas asasasasas'
        },
        {
            id: 2,
            name: 'Alexander Gray',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas sas sas asasasasas asasasasas'
        },
        {
            id: 3,
            name: 'James Taylor',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asa sas sas asasasasas sas sas asasasasas sasasas'
        },
        {
            id: 4,
            name: 'Grace Roberts',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas a sas sas asasasasas sas sas asasasasassas sas asasasasassas sas asasasasassas sas asasasasassas sas asasasasassas sas asasasasassas sas asasasasassas sas asasasasassas sas asasasasassasasasas'
        },
        {
            id: 5,
            name: 'Donna Rogers',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasas'
        },
        {
            id: 6,
            name: 'Amy Diaz',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasas'
        },
        {
            id: 7,
            name: 'Nia Hillyer',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasas'
        },
        {
            id: 8,
            name: 'Mary McDonald',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasas'
        },
        {
            id: 9,
            name: 'Andy King',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasas'
        },
        {
            id: 10,
            name: 'Vincent Carpenter',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasas'
        },
        {
            id: 11,
            name: 'Kelly Young',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasas'
        },
        {
            id: 12,
            name: 'Alma Clarke',
            profile: 'profile-1.jpeg',
            rating: 4,
            comment: 'sas sas asasasasas'
        },
    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);

    useEffect(() => {
        setPage(1);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    const getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return (
        <div>
            
            <div className="panel px-7 border-white-light dark:border-[#1b2e4b]">

                <div className="invoice-table">
                    <div className="bg-slate-300 dark:bg-slate-600 dark:text-slate-300 mt-4 py-2 rounded-t-md px-4 flex md:items-center md:flex-row flex-col gap-5">
                        <div className='text-lg'>Customer Ratings</div>
                        
                        <div className="ltr:ml-auto rtl:mr-auto">
                        </div>
                    </div>

                    <div className="datatables pagination-padding">
                        <DataTable
                            className="whitespace-nowrap table-hover invoice-table"
                            records={records}
                            columns={[
                                
                                {
                                    accessor: 'Customer',
                                    render: ({ name, id }) => (
                                        <div className="flex items-center font-semibold">
                                            <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                                                <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                            </div>
                                            <div>{name}</div>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'rating',
                                    title: 'Rate',
                                    titleClassName: '!text-center',
                                    render: ({ id }) => (
                                        <div className="flex items-center justify-center text-warning">
                                            {Array.from(Array(getRandomNumber(1, 5)).keys()).map((i) => {
                                                return <IconStar key={i + id} className=" fill-warning" />;
                                            })}
                                        </div>
                                    ),
                                },
                                { accessor: 'comment',
                                render: ({ comment }) => (
                                    <div className='whitespace-normal'>{comment}</div>
                                ), title: 'Comment' },

                            ]}
                            highlightOnHover
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderRatings;
