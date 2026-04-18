import "@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const { email } = await req.json();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "MICH Bookstore <hola@michbook.com>",
      to: email,
      subject: "Bienvenido a MICH Bookstore",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff; color: #111; padding: 40px 32px; border-radius: 16px;">
          <h1 style="font-size: 22px; font-weight: 600; font-style: normal; line-height: 1.3; margin-bottom: 20px;">El primer capítulo empieza aquí.</h1>
          <p style="color: #444; line-height: 1.6; margin-bottom: 24px;">
            Nos alegra tenerte aquí. En MICH creemos que los buenos libros encuentran a las personas correctas — y que tú llegaste en el momento justo. Bienvenido a nuestra comunidad.
          </p>
          <p style="color: #444; line-height: 1.6; margin-bottom: 32px;">
            Tenemos libros nuevos y usados, cuidadosamente seleccionados. Desde clásicos que nunca pasan de moda hasta novedades editoriales que acaban de llegar. Hay algo esperándote — solo tienes que encontrarlo.
          </p>
          <a href="https://michbookstore.com" style="display: inline-block; background: #111; color: #fff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Explorar librería
          </a>
          <p style="margin-top: 40px; color: #aaa; font-size: 12px;">
            MICH Bookstore · Arequipa, Perú · michbookstore@gmail.com
          </p>
        </div>
      `,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
