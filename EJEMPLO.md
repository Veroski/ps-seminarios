import React, { useState } from 'react'
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react'

type TattooExperience = '' | 'menos_6_meses' | '6_12_meses' | 'mas_1_año';
type MainDifficulty = '' | 'trazo_limpio' | 'curacion_durabilidad' | 'seguridad_confianza' | 'conseguir_clientes';
type CanAttendWeekend = '' | 'si' | 'no';
type BudgetRange = '' | 'menos_1000' | '1000_1500' | 'mas_1500';

export default function ContactSection() {
    const API_URL = "/api/ghl/contact";

    const [formData, setFormData] = useState({
        full_name: '',
        email: '', // <--- 1. NUEVO CAMPO EMAIL
        phone: '',
        tattoo_experience: '' as TattooExperience,
        main_difficulty: '' as MainDifficulty,
        main_goal: '',
        can_attend_weekend: '' as CanAttendWeekend,
        budget_range: '' as BudgetRange
    });

    const [status, setStatus] = useState('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Error en la conexión');
            }
        } catch (error) {
            console.error("Error enviando formulario:", error);
            setStatus('error');
        }
    };

    const experienceOptions: { value: TattooExperience; label: string }[] = [
        { value: 'menos_6_meses', label: 'Menos de 6 meses' },
        { value: '6_12_meses', label: '6–12 meses' },
        { value: 'mas_1_año', label: '+1 año' },
    ];

    const difficultyOptions: { value: MainDifficulty; label: string }[] = [
        { value: 'trazo_limpio', label: 'Trazo limpio' },
        { value: 'curacion_durabilidad', label: 'Curación / durabilidad' },
        { value: 'seguridad_confianza', label: 'Seguridad y confianza' },
        { value: 'conseguir_clientes', label: 'Conseguir clientes' },
    ];

    const weekendOptions: { value: CanAttendWeekend; label: string }[] = [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
    ];

    const budgetOptions: { value: BudgetRange; label: string }[] = [
        { value: 'menos_1000', label: 'Menos de 1.000€' },
        { value: '1000_1500', label: 'Entre 1.000€ y 1.500€' },
        { value: 'mas_1500', label: 'Más de 1.500€' },
    ];

    return (
        <section id="reservar" className="py-24 px-6 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-neutral-900">
                        ¿Te interesa el seminario?
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Completa el formulario y te contactaremos con toda la información sobre fechas, precios y disponibilidad.
                    </p>
                </div>

                <div className="bg-neutral-50 p-8 md:p-12 rounded-3xl border border-neutral-200 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

                    {status === 'success' ? (
                        <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-2">¡Gracias por tu interés!</h3>
                            <p className="text-neutral-600 mb-6">
                                Hemos recibido tu solicitud. Te contactaremos pronto por con toda la información sobre el seminario.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="text-cyan-600 font-bold hover:text-cyan-700 underline"
                            >
                                Enviar otra solicitud
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Nombre y apellidos */}
                            <div className="space-y-2">
                                <label htmlFor="full_name" className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                                    Nombre y apellidos
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    id="full_name"
                                    required
                                    placeholder="Ej. María García López"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                />
                            </div>

                            {/* --- 2. INPUT DE EMAIL AÑADIDO --- */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                                    Correo Electrónico <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="ejemplo@correo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                />
                            </div>

                            {/* Teléfono (WhatsApp) */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                                    Teléfono (WhatsApp) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    required
                                    placeholder="+34 600 000 000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                />
                            </div>

                            {/* ... Resto del formulario (Experiencia, Dificultad, etc.) ... */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-neutral-900 uppercase tracking-wide block">
                                    ¿Cuánto tiempo llevas tatuando?
                                </label>
                                <div className="space-y-2">
                                    {experienceOptions.map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.tattoo_experience === option.value
                                                ? 'border-cyan-500 bg-cyan-50'
                                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="tattoo_experience"
                                                value={option.value}
                                                checked={formData.tattoo_experience === option.value}
                                                onChange={handleChange}
                                                required
                                                className="w-4 h-4 text-cyan-600 border-neutral-300 focus:ring-cyan-500"
                                            />
                                            <span className="text-neutral-700 font-medium">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-neutral-900 uppercase tracking-wide block">
                                    ¿Qué es lo que más te cuesta ahora mismo con la línea fina?
                                </label>
                                <div className="space-y-2">
                                    {difficultyOptions.map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.main_difficulty === option.value
                                                ? 'border-cyan-500 bg-cyan-50'
                                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="main_difficulty"
                                                value={option.value}
                                                checked={formData.main_difficulty === option.value}
                                                onChange={handleChange}
                                                required
                                                className="w-4 h-4 text-cyan-600 border-neutral-300 focus:ring-cyan-500"
                                            />
                                            <span className="text-neutral-700 font-medium">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="main_goal" className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                                    ¿Cuál es el objetivo principal que quieres conseguir con este seminario?
                                </label>
                                <textarea
                                    name="main_goal"
                                    id="main_goal"
                                    rows={3}
                                    required
                                    placeholder="Mejorar la limpieza de mis líneas y ganar seguridad para cobrar más por mis trabajos."
                                    value={formData.main_goal}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none"
                                ></textarea>
                                <p className="text-xs text-neutral-400">
                                    2-3 líneas máximo
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-neutral-900 uppercase tracking-wide block">
                                    ¿Podrías asistir un fin de semana completo al seminario en Barcelona si eres seleccionado/a?
                                </label>
                                <div className="flex gap-4">
                                    {weekendOptions.map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${formData.can_attend_weekend === option.value
                                                ? 'border-cyan-500 bg-cyan-50'
                                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="can_attend_weekend"
                                                value={option.value}
                                                checked={formData.can_attend_weekend === option.value}
                                                onChange={handleChange}
                                                required
                                                className="w-4 h-4 text-cyan-600 border-neutral-300 focus:ring-cyan-500"
                                            />
                                            <span className="text-neutral-700 font-bold">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-neutral-900 uppercase tracking-wide block">
                                    ¿Cuánto estarías dispuesto/a a invertir en tu carrera?
                                </label>
                                <div className="space-y-2">
                                    {budgetOptions.map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.budget_range === option.value
                                                ? 'border-cyan-500 bg-cyan-50'
                                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="budget_range"
                                                value={option.value}
                                                checked={formData.budget_range === option.value}
                                                onChange={handleChange}
                                                required
                                                className="w-4 h-4 text-cyan-600 border-neutral-300 focus:ring-cyan-500"
                                            />
                                            <span className="text-neutral-700 font-medium">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    Hubo un error al enviar. Por favor, inténtalo de nuevo o escríbenos por Instagram.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        Quiero más información <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-neutral-400 mt-4">
                                Al enviar, aceptas ser contactado para recibir información sobre el seminario.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}




















----------------------------------------------------




api/ghl

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // 1. Verificamos credenciales
        if (!process.env.GHL_PRIVATE_KEY || !process.env.GHL_LOCATION_ID) {
            console.error("Faltan credenciales de GHL en .env");
            return NextResponse.json({ ok: false, error: "Configuration error" }, { status: 500 });
        }

        // 2. HELPER: Separar Nombre y Apellido 
        // Seguimos usando esto porque la API lo exige estrictamente
        const splitName = (fullName: string) => {
            const parts = fullName.trim().split(" ");
            if (parts.length === 1) {
                return { firstName: parts[0], lastName: "." };
            }
            const firstName = parts[0];
            const lastName = parts.slice(1).join(" ");
            return { firstName, lastName };
        };

        const { firstName, lastName } = splitName(data.full_name || "");

        // 3. Mapeos de valores
        const experienceMap: Record<string, string> = {
            'menos_6_meses': 'Menos de 6 meses',
            '6_12_meses': '6–12 meses',
            'mas_1_año': '+1 año'
        };

        const difficultyMap: Record<string, string> = {
            'trazo_limpio': 'Trazo limpio',
            'curacion_durabilidad': 'Curación / durabilidad',
            'seguridad_confianza': 'Seguridad y confianza',
            'conseguir_clientes': 'Conseguir clientes'
        };

        const weekendMap: Record<string, string> = {
            'si': 'Sí',
            'no': 'No'
        };

        const budgetMap: Record<string, string> = {
            'menos_1000': 'Menos de 1.000€',
            '1000_1500': 'Entre 1.000€ y 1.500€',
            'mas_1500': 'Más de 1.500€'
        };

        // 4. PETICIÓN A GHL (Usando UPSERT + Email Real)
        const res = await fetch(
            "https://services.leadconnectorhq.com/contacts/upsert/",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.GHL_PRIVATE_KEY}`,
                    Version: "2021-07-28",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    locationId: process.env.GHL_LOCATION_ID,

                    // Datos principales (Ahora usamos el email real)
                    phone: data.phone,
                    email: data.email, // <--- EMAIL REAL DEL USUARIO

                    // Nombres
                    firstName: firstName,
                    lastName: lastName,
                    name: data.full_name,

                    source: "Landing Seminario EFA",
                    tags: ["lead seminario landing"],

                    // Campos personalizados
                    customFields: [
                        {
                            key: "tattoo_experience",
                            value: experienceMap[data.tattoo_experience] || data.tattoo_experience,
                        },
                        {
                            key: "main_difficulty",
                            value: difficultyMap[data.main_difficulty] || data.main_difficulty,
                        },
                        {
                            key: "main_goal",
                            value: data.main_goal,
                        },
                        {
                            key: "can_attend_weekend",
                            value: weekendMap[data.can_attend_weekend] || data.can_attend_weekend,
                        },
                        {
                            key: "contact.e_money_group",
                            value: budgetMap[data.budget_range] || data.budget_range,
                        },
                    ],
                }),
            }
        );

        const responseText = await res.text();

        if (!res.ok) {
            console.error("GHL Error:", res.status, responseText);
            return NextResponse.json({ ok: false, details: responseText }, { status: res.status });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
