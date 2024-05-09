"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";

export default function AddFields({ myndighet }: any) {
    const EDITMODE = myndighet.myndighet._id === "new" ? false : true;
    const router = useRouter();
    let defaultData = {
        name: "",
        relation: "",
        created: "xxxx",
        rule: "",
        info: "",
        logo_url: "",
        epost: "",
        org: "",
        tele: "",
        web: "",
    };

    if (EDITMODE) {
        defaultData = myndighet.myndighet;
    }

    const [formData, setFormData] = useState(defaultData);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const validateFormData = (formData: any) => {
        const { name, relation, created, rule, info, org, tele } = formData;

        if (!name || !relation || !created || !rule || !info || !org || !tele) {
            return false;
        }

        if (isNaN(created) && isNaN(org) && isNaN(tele)) {
            return false;
        }

        return true;
    }

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result?.toString().replace(/^data:.+;base64,/, '');
            if (!base64String) return;

            // Now you can use this base64String as the logo data
            // For example, you can set it as the value of formData.logo_url
            setFormData((prevData: any) => ({
                ...prevData,
                logo_url: `data:${file.type};base64,${base64String}`,
            }));
        };

        reader.readAsDataURL(file);
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateFormData(formData)) {
            alert('Fel formatering i formuläret.');
            return;
        } else {
            setFormData(defaultData);
        }

        if (EDITMODE) {
            await fetch(`/api/myndigheter/${myndighet.id}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            await fetch(`/api/myndigheter`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    }

    return (
        <div className="w-full sm:w-2/3 ml-auto mr-auto">
            <Card className='p-5'>
                <CardTitle className="text-center mb-10">{EDITMODE ? "Updatera " + defaultData.name : "Lägg till en ny myndighet"}</CardTitle>

                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-stretch">

                    {/* NAMN */}
                    <div className="m-5">
                        <CardDescription>Namn</CardDescription>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.name}
                            placeholder="Myndighetens namn"
                            className="border-solid border-2 border-slate-300 rounded-sm p-1 mt-1"
                        />
                    </div>

                    {/* SKAPADES */}
                    <div className="m-5">
                        <CardDescription>Skapades</CardDescription>
                        <input
                            id="created"
                            name="created"
                            type="number"
                            onChange={handleChange}
                            required={true}
                            value={formData.created}
                            placeholder="xxxx"
                            className="border-solid border-2 border-slate-300 rounded-sm p-1 mt-1"
                        />
                    </div>

                    {/* DEPARTEMENT */}
                    <div className="m-5">
                        <CardDescription>Departement</CardDescription>
                        <select
                            id="relation"
                            name="relation"
                            onChange={handleChange}
                            required={true}
                            value={formData.relation}
                            className="p-10"
                        >
                            <option value="Arbetsmarknadsdepartementet">Arbetsmarknadsdepartementet</option>
                            <option value="Finansdepartementet">Finansdepartementet</option>
                            <option value="Försvarsdepartementet">Försvarsdepartementet</option>
                            <option value="Justitiedepartementet">Justitiedepartementet</option>
                            <option value="Klimat- och näringslivsdepartementet">Klimat- och näringslivsdepartementet</option>
                            <option value="Kulturdepartementet">Kulturdepartementet</option>
                            <option value="Landsbygds- och infrastrukturdepartementet">Landsbygds- och infrastrukturdepartementet</option>
                            <option value="Socialdepartementet">Socialdepartementet</option>
                            <option value="Statsrådsberedningen">Statsrådsberedningen</option>
                            <option value="Utbildningsdepartementet">Utbildningsdepartementet</option>
                            <option value="Utrikesdepartementet">Utrikesdepartementet</option>
                        </select>
                    </div>

                    {/* LEDNING */}
                    <div className="m-5">
                        <CardDescription>Ledning</CardDescription>
                        <select
                            id="rule"
                            name="rule"
                            onChange={handleChange}
                            required={true}
                            value={formData.rule}
                        >
                            <option value="Styrelse">Styrelse</option>
                            <option value="Enrådighet">Enrådighet</option>
                            <option value="SBA">SBA</option>
                            <option value="Nämnd">Nämnd</option>
                            <option value="Kommitté">Kommitté</option>v
                            <option value="Universitet eller högskola">Universitet eller högskola</option>
                            <option value="Regeringskansliet">Regeringskansliet</option>
                            <option value="Övrigt">Övrigt</option>
                        </select>
                    </div>

                    {/* EPOST */}
                    <div className="m-5">
                        <CardDescription>Mailadress</CardDescription>
                        <input
                            id="epost"
                            name="epost"
                            type="email"
                            onChange={handleChange}
                            required={true}
                            value={formData.epost}
                            placeholder="myndighet@domain.se"
                            className="border-solid border-2 border-slate-300 rounded-sm p-1 mt-1"
                        />
                    </div>

                    {/* ORG */}
                    <div className="m-5">
                        <CardDescription>Organisationsnummer</CardDescription>
                        <input
                            id="org"
                            name="org"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.org}
                            placeholder="xxxxxx-xxxx"
                            className="border-solid border-2 border-slate-300 rounded-sm p-1 mt-1"
                        />
                    </div>

                    {/* TELE */}
                    <div className="m-5">
                        <CardDescription>Telefonnummer</CardDescription>
                        <input
                            id="tele"
                            name="tele"
                            type="tel"
                            onChange={handleChange}
                            required={true}
                            value={formData.tele}
                            placeholder="xxx-xxx xx xx"
                            className="border-solid border-2 border-slate-300 rounded-sm p-1 mt-1"
                        />
                    </div>

                    {/* WEB */}
                    <div className="m-5">
                        <CardDescription>Webbplats</CardDescription>
                        <input
                            id="web"
                            name="web"
                            type="url"
                            onChange={handleChange}
                            required={true}
                            value={formData.web}
                            placeholder="myndighet.se"
                            className="border-solid border-2 border-slate-300 rounded-sm p-1 mt-1"
                        />
                    </div>

                    {/* INFORMATION */}
                    <div className="col-span-1 sm:col-span-2 m-5 ">
                        <CardDescription>Information</CardDescription>
                        <textarea
                            className="w-full border-solid border-2 border-slate-300 rounded-sm p-1 mt-1"
                            id="info"
                            name="info"
                            onChange={handleChange}
                            required={true}
                            value={formData.info}
                            rows={5}
                            placeholder="Information om myndigheten"
                        />
                    </div>
                    {/* logo_url */}
                    <div className="col-span-1 sm:col-span-2 m-5 justify-center">
                        <CardDescription>Ladda upp logotyp</CardDescription>
                        <div className="flex items-center mt-1">
                        <label htmlFor="logoInput" className="border-solid border-2 border-slate-300 rounded-sm p-1 mr-2 cursor-pointer">
                            {formData.logo_url ? (
                                    <p >Byt logotyp</p>
                                ) : (
                                    <p >Ladda upp logotyp</p>
                            )}
                        </label>
                            <input
                                id="logoInput"
                                name="logo_url"
                                type="file"
                                className="border-solid border-2 border-slate-300 rounded-sm p-1 mr-2"
                                accept="image/png, image/jpeg"
                                onChange={handleLogoUpload}
                                style = {{display: 'none'}}
                            />
                            {formData.logo_url ? (
                                    <p className="text-green-600">Logotyp uppladdad</p>
                                ) : (
                                    <p className="text-red-600">Ingen logotyp uppladdad</p>
                            )}
                        </div>
                    </div>
                </form>
            </Card>

            <div className="flex justify-center mt-20 mb-20">
                <Button variant="outline" className="bg-green-500 text-white ml-5" onClick={handleSubmit}>
                    {EDITMODE ? "Updatera" : "Lägg till"}
                </Button>
            </div>
        </div>

    );
}
