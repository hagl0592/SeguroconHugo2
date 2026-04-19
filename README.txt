Seguro con Hugo - versión pro con backend

Archivos:
- index.html
- api/udi.js
- vercel.json

Cómo usar en Vercel:
1. Sube esta carpeta a un repositorio nuevo.
2. Importa el repositorio en Vercel.
3. En Settings > Environment Variables agrega:
   BANXICO_TOKEN = e680a779ac758b4ca44fce68bb1ee3bcb1795fea40e0dae79682c9869f3c3dfd
4. Deploy.

Qué hace:
- El frontend consulta /api/udi
- El backend consulta Banxico con tu token oculto
- Si Banxico falla, usa fallback de 8.80
