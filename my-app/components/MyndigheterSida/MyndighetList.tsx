"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MynList() {

    const [loading, setLoading] = useState(true);
    const [myndigheter, setMyndigheter] = useState<any[]>([]);

    const fetchMyndigheter = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/myndigheter");
            const data = await res.json();
            return data.myndighet;
        } catch (error) {
            console.error("Error fetching myndigheter:", error);
            return [];
        }
    }

    useEffect(() => {
        fetchMyndigheter().then((myndigheter) => {
            setMyndigheter(myndigheter);
            setLoading(false);
        }).catch((error) => {
            console.error("Error setting myndigheter:", error);
        });
    }, []);

    const groupedMyndigheter: { [key: string]: any[] } = myndigheter.reduce((acc: any, myndighet: any) => {
        const firstLetter = myndighet.name.charAt(0).toUpperCase();
        acc[firstLetter] = acc[firstLetter] || [];
        acc[firstLetter].push(myndighet);
        return acc;
    }, {});

    const sortedKeys = Object.keys(groupedMyndigheter).sort();

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
            <Link href="/myndighet">
                <Button variant="outline" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white ml-8 mt-8">Tillbaka</Button>
            </Link>

            <Card className=" h-5/6 w-2/4 mx-auto">
                <CardContent className="m-1 my-10">
                    <CardTitle className="my-10">Myndigheter under regeringen utifrån alfabetisk ordning</CardTitle>

                    {loading == true ? (
                        <div>
                            {cards}
                        </div>
                    ) : (
                        <div>
                            {sortedKeys.map((letter) => (
                                <div key={letter}>
                                    <h2 className='font-bold'>{letter}</h2>
                                    {groupedMyndigheter[letter].map((myndighet: any, index: any) => (
                                        <p key={index}>{myndighet.name}</p>
                                    ))}
                                </div>
                            ))}
                        </div>)}
                </CardContent>
            </Card>
        </div>
    );
}
