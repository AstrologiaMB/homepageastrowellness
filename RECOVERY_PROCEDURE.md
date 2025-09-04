# 🚨 PROCEDIMIENTO DE RECUPERACIÓN DE EMERGENCIAS
## Astrowellness - Recuperación desde commit roto

### 📅 Fecha del incidente: 4 de septiembre 2025
### 🔧 Commit problemático: `363b623` - "Restaurar cambios funcionales desde stash"
### ✅ Commit de recuperación: `6af4680` - "PDF completo + Auth + Security"

---

## 🚨 SÍNTOMAS DEL PROBLEMA

### Error detectado:
```
error: Error validating datasource `db`: the URL must start with the protocol `file:`.
```

### Causa raíz:
- Se restauró un archivo incorrecto desde el stash
- El archivo `app/api/cartas/cruzada/route.ts` tenía configuración incorrecta
- La base de datos no podía conectarse

---

## 🛠️ PROCEDIMIENTO DE RECUPERACIÓN

### Paso 1: Identificar commits disponibles
```bash
git log --oneline --all --graph --decorate --since="2 days ago"
```

### Paso 2: Crear rama de recuperación
```bash
git checkout -b recovery-from-yesterday 6af4680
```

### Paso 3: Verificar funcionamiento
```bash
npm run dev
# Verificar que la aplicación inicia correctamente
```

### Paso 4: Hacer commit de respaldo
```bash
git add .
git commit -m "RECOVERY: Estado funcional recuperado desde commit 6af4680"
```

---

## 📋 COMMITS DE RESPALDO DISPONIBLES

### ✅ Commits funcionales disponibles:
- **`6af4680`** - PDF completo + Auth + Security (USADO)
- **`b22cda2`** - Autenticación email/password completa
- **`04d3542`** - Funcionalidades de seguridad
- **`a3dbd5e`** - Análisis completo PDF
- **`e60570e`** - Componentes dracónicos

### 🔄 Cómo usar commits de respaldo:
```bash
# Para autenticación
git checkout -b fix-auth b22cda2

# Para seguridad
git checkout -b fix-security 04d3542

# Para PDF
git checkout -b fix-pdf a3dbd5e
```

---

## 🛡️ MEDIDAS PREVENTIVAS IMPLEMENTADAS

### ✅ Mejores prácticas adoptadas:

1. **Commits más frecuentes**
   ```bash
   git commit -m "feat: [descripción clara]"
   ```

2. **Ramas backup periódicas**
   ```bash
   git checkout -b backup-stable-v2.1
   git tag v2.1-stable
   ```

3. **Tags para versiones estables**
   ```bash
   git tag v2.1-stable
   git push origin --tags
   ```

4. **Documentación de recuperación**
   - Este archivo `RECOVERY_PROCEDURE.md`
   - Lista de commits críticos
   - Procedimientos paso a paso

### ✅ Checklist de verificación:

- [ ] Aplicación inicia correctamente (`npm run dev`)
- [ ] Base de datos conectada
- [ ] Autenticación funciona
- [ ] PDFs se generan correctamente
- [ ] APIs responden correctamente

---

## 📞 CONTACTOS DE EMERGENCIA

### En caso de problemas similares:
1. Revisar este documento
2. Usar commits de respaldo listados arriba
3. Crear nueva rama de recuperación
4. Documentar el nuevo incidente

### Comando rápido de recuperación:
```bash
git checkout -b emergency-recovery 6af4680
```

---

## 📊 ESTADO ACTUAL POST-RECUPERACIÓN

- ✅ **Estado**: Funcionando perfectamente
- ✅ **Rama**: `recovery-from-yesterday`
- ✅ **Commit base**: `6af4680`
- ✅ **Funcionalidades**: PDF + Auth + Security + Draconic
- ✅ **Base de datos**: Conectada correctamente
- ✅ **Documentación**: Actualizada

---

## 🎯 LECCIONES APRENDIDAS

1. **Siempre verificar antes de restaurar desde stash**
2. **Crear backups antes de cambios grandes**
3. **Documentar procedimientos de recuperación**
4. **Mantener commits funcionales identificados**
5. **Usar ramas para aislamiento de cambios**

---

*Documento creado: 4 de septiembre 2025*
*Última actualización: 4 de septiembre 2025*
