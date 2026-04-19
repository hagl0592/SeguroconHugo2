export default async function handler(req, res) {
  const token = process.env.BANXICO_TOKEN;
  const fallback = 8.8;

  if (!token) {
    return res.status(200).json({ udi: fallback, source: "fallback-no-token" });
  }

  try {
    const url = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP68257/datos/oportuno?token=${token}`;
    const response = await fetch(url, {
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
      return res.status(200).json({ udi: fallback, source: "fallback-http-error" });
    }

    const data = await response.json();
    const dato = data?.bmx?.series?.[0]?.datos?.[0]?.dato;
    const valor = Number(String(dato ?? "").replace(/,/g, ""));

    if (Number.isFinite(valor) && valor > 0) {
      return res.status(200).json({ udi: valor, source: "banxico" });
    }

    return res.status(200).json({ udi: fallback, source: "fallback-invalid-data" });
  } catch (error) {
    return res.status(200).json({ udi: fallback, source: "fallback-exception" });
  }
}
