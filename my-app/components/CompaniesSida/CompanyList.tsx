"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CoList() {

    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState<any[]>([]);

    const fetchCompanies = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/companies?fields=name,_id");
            const data = await res.json();
            return data.company;
        } catch (error) {
            console.error("Error fetching companies:", error);
            return [];
        }
    }

    useEffect(() => {
        fetchCompanies().then((companies) => {
            setCompanies(companies);
            setLoading(false);
        }).catch((error) => {
            console.error("Error setting companies:", error);
        });
    }, []);

    const groupedCompanies: { [key: string]: any[] } = companies.reduce((acc: any, company: any) => {
        const firstLetter = company.name.charAt(0).toUpperCase();
        acc[firstLetter] = acc[firstLetter] || [];
        acc[firstLetter].push(company);
        return acc;
    }, {});

    const sortedKeys = Object.keys(groupedCompanies).sort();

    const cards = [];

    for (let i = 0; i < 30; i++) {
        cards.push(
            <div key={i}>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-3 h-16 mt-1"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Link href="/company">
                <Button variant="outline" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white ml-8 mt-8">Tillbaka</Button>
            </Link>

            <Card className=" h-5/6 w-2/4 mx-auto">
                <CardContent className="m-1 my-10">
                    <CardTitle className="my-10">Statliga företag i alfabetisk ordning.</CardTitle>
                    {loading == true ? (
                        <div>
                            {cards}
                        </div>
                    ) : (
                    <div>
                        {sortedKeys.map((letter) => (
                            <div key={letter}>
                                <h2 className='font-bold'>{letter}</h2>
                                {groupedCompanies[letter].map((company: any, index: any) => (
                                    <p key={index}>{company.name}</p>
                                ))}
                            </div>
                        ))}
                    </div>)}
                </CardContent>
            </Card>
        </div>
    );
}
