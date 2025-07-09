#!/usr/bin/env python3
"""
Script de Diagnóstico: Eventos Detectables por InterpretadorRAG
================================================================

Este script analiza qué eventos puede detectar el interpretador RAG
cargando los mismos títulos objetivo que usa el sistema en producción.

Propósito: Investigar por qué "Sol conjunción Lilith" no aparece en interpretaciones.

Autor: Cline AI Assistant
Fecha: 8 de Julio, 2025
"""

import sys
import os
import re
from pathlib import Path
from collections import defaultdict

def load_target_titles_from_file(filepath):
    """
    Cargar y procesar títulos desde archivo MD
    (Copia exacta del método usado en interpretador_refactored.py)
    """
    target_titles = set()
    aspect_keywords = ["conjunción", "oposición", "cuadratura", "trígono", "sextil"]
    
    try:
        path_obj = Path(filepath)
        if not path_obj.is_file():
            raise FileNotFoundError(f"Archivo no encontrado: {filepath}")

        with path_obj.open('r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                match_header = re.match(r"^(?:### |#### )\s*\d+(?:\.\d+)*\s+(.*)", line)
                match_retrograde = re.match(r"^## \d+\.\d+\s+([A-ZÁÉÍÓÚÜÑ]+\s+RETRÓGRADO)", line)
                title_to_process = None

                if match_header:
                    title_to_process = match_header.group(1).strip()
                elif match_retrograde:
                    title_to_process = match_retrograde.group(1).strip()
                elif re.match(r"^[A-Z\s]+ RETRÓGRADO", line):
                    title_to_process = line.strip()

                if title_to_process:
                    normalized_title = re.sub(r'\s*\(\d+°.*?\)', '', title_to_process)
                    normalized_title = re.sub(r':.*', '', normalized_title)
                    normalized_title = normalized_title.lower()
                    normalized_title = re.sub(r'\s+', ' ', normalized_title).strip()
                    normalized_title = normalized_title.replace(" en casa dos", " en casa 2")

                    is_relevant = (
                        normalized_title.startswith("aspecto ") or
                        " en " in normalized_title or
                        normalized_title.endswith(" retrógrado") or
                        " en el ascendente" in normalized_title
                    )

                    if is_relevant:
                        if normalized_title.startswith("aspecto "):
                            match_aspect = re.match(r"aspecto\s+([a-záéíóúüñ]+)\s+(.*?)\s+a\s+([a-záéíóúüñ]+)", normalized_title)
                            if match_aspect:
                                planet1 = match_aspect.group(1)
                                aspect_part = match_aspect.group(2)
                                planet2 = match_aspect.group(3)

                                found_aspects = [kw for kw in aspect_keywords if kw in aspect_part.split()]

                                if found_aspects:
                                    for asp in found_aspects:
                                        specific_title = f"aspecto {planet1} {asp} a {planet2}"
                                        target_titles.add(specific_title)
                                        # Guardar info adicional para debugging
                                        if hasattr(target_titles, '_debug_info'):
                                            target_titles._debug_info.append({
                                                'line': line_num,
                                                'original': line,
                                                'processed': specific_title,
                                                'planet1': planet1,
                                                'aspect': asp,
                                                'planet2': planet2
                                            })
                                else:
                                    target_titles.add(normalized_title)
                            else:
                                target_titles.add(normalized_title)
                        else:
                            target_titles.add(normalized_title)

        return target_titles
        
    except Exception as e:
        print(f"❌ Error al leer archivo de títulos '{filepath}': {e}")
        return None

def categorize_titles(titles):
    """Categorizar títulos por tipo"""
    categories = defaultdict(list)
    
    for title in sorted(titles):
        if title.startswith("aspecto "):
            categories["Aspectos"].append(title)
        elif " en casa " in title:
            categories["Planetas en Casas"].append(title)
        elif " en " in title and " casa " not in title:
            categories["Planetas en Signos"].append(title)
        elif title.endswith(" retrógrado"):
            categories["Planetas Retrógrados"].append(title)
        elif " en el ascendente" in title:
            categories["Planetas en Ascendente"].append(title)
        else:
            categories["Otros"].append(title)
    
    return categories

def search_lilith_titles(titles):
    """Buscar específicamente títulos relacionados con Lilith"""
    lilith_titles = []
    for title in sorted(titles):
        if "lilith" in title.lower():
            lilith_titles.append(title)
    return lilith_titles

def search_specific_patterns(titles):
    """Buscar patrones específicos para debugging"""
    patterns = {
        "sol_conjuncion_lilith_con_a": "aspecto sol conjunción a lilith",
        "sol_conjuncion_lilith_sin_a": "aspecto sol conjunción lilith",
        "marte_conjuncion_pluton": "aspecto marte conjunción plutón",
        "marte_conjuncion_pluton_con_a": "aspecto marte conjunción a plutón"
    }
    
    results = {}
    for pattern_name, pattern in patterns.items():
        results[pattern_name] = pattern in titles
    
    return results

def generate_report(titles, categories, lilith_titles, patterns):
    """Generar reporte completo"""
    report = []
    report.append("=" * 80)
    report.append("DIAGNÓSTICO: EVENTOS DETECTABLES POR INTERPRETADOR RAG")
    report.append("=" * 80)
    report.append(f"Fecha: {os.popen('date').read().strip()}")
    report.append(f"Total de títulos objetivo cargados: {len(titles)}")
    report.append("")
    
    # Estadísticas por categoría
    report.append("📊 ESTADÍSTICAS POR CATEGORÍA")
    report.append("-" * 40)
    for category, items in categories.items():
        report.append(f"{category}: {len(items)} títulos")
    report.append("")
    
    # Búsqueda específica de patrones
    report.append("🔍 BÚSQUEDA DE PATRONES ESPECÍFICOS")
    report.append("-" * 40)
    for pattern_name, found in patterns.items():
        status = "✅ ENCONTRADO" if found else "❌ NO ENCONTRADO"
        report.append(f"{pattern_name}: {status}")
    report.append("")
    
    # Títulos de Lilith
    report.append("🌙 TÍTULOS RELACIONADOS CON LILITH")
    report.append("-" * 40)
    if lilith_titles:
        for title in lilith_titles:
            report.append(f"  • {title}")
    else:
        report.append("  ❌ No se encontraron títulos de Lilith")
    report.append("")
    
    # Lista completa por categoría
    report.append("📋 LISTA COMPLETA DE TÍTULOS POR CATEGORÍA")
    report.append("-" * 50)
    for category, items in categories.items():
        report.append(f"\n### {category.upper()} ({len(items)} títulos)")
        for item in items:
            report.append(f"  • {item}")
    
    return "\n".join(report)

def main():
    """Función principal"""
    print("🔍 Iniciando diagnóstico de eventos detectables...")
    
    # Ruta al archivo de títulos (misma que usa el interpretador)
    titles_file = "../astro_interpretador_rag_fastapi/data/Títulos Numerados tropico.md"
    
    if not os.path.exists(titles_file):
        print(f"❌ Error: No se encontró el archivo {titles_file}")
        sys.exit(1)
    
    print(f"📄 Cargando títulos desde: {titles_file}")
    
    # Cargar títulos usando el mismo método que el interpretador
    titles = load_target_titles_from_file(titles_file)
    
    if not titles:
        print("❌ Error: No se pudieron cargar los títulos")
        sys.exit(1)
    
    print(f"✅ Títulos cargados: {len(titles)}")
    
    # Analizar títulos
    print("📊 Categorizando títulos...")
    categories = categorize_titles(titles)
    
    print("🌙 Buscando títulos de Lilith...")
    lilith_titles = search_lilith_titles(titles)
    
    print("🔍 Buscando patrones específicos...")
    patterns = search_specific_patterns(titles)
    
    # Generar reporte
    print("📝 Generando reporte...")
    report = generate_report(titles, categories, lilith_titles, patterns)
    
    # Guardar reporte
    report_file = "diagnostico_eventos_detectables_reporte.txt"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"✅ Reporte guardado en: {report_file}")
    
    # Mostrar resumen en consola
    print("\n" + "=" * 60)
    print("RESUMEN EJECUTIVO")
    print("=" * 60)
    print(f"Total títulos: {len(titles)}")
    print(f"Títulos de Lilith: {len(lilith_titles)}")
    
    print("\nPatrones críticos:")
    for pattern_name, found in patterns.items():
        status = "✅" if found else "❌"
        print(f"  {status} {pattern_name}")
    
    if lilith_titles:
        print(f"\nTítulos de Lilith encontrados:")
        for title in lilith_titles:
            print(f"  • {title}")
    
    print(f"\n📄 Ver reporte completo en: {report_file}")

if __name__ == "__main__":
    main()
