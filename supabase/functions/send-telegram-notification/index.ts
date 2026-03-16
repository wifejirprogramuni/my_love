import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  name: string;
  dish: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, dish }: RequestBody = await req.json();

    if (!name || !dish) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const adminIds = [476747112, 547222318];
    const dishEmoji = dish === "salmon" ? "🐟" : "🥩";
    const dishName = dish === "salmon" ? "Стейк из лосося" : "Говяжьи медальоны";
    const now = new Date();
    const dateString = now.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const message = `📩 <b>Новая заявка со свадьбы!</b>\n👤 <b>Имя:</b> ${name}\n${dishEmoji} <b>Горячее:</b> ${dishName}\n📅 <b>Отправлено:</b> ${dateString}`;

    const sendPromises = adminIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      })
    );

    const responses = await Promise.all(sendPromises);
    const results = await Promise.all(responses.map((r) => r.json()));

    const allSuccessful = results.every((r) => r.ok === true);

    if (!allSuccessful) {
      console.error("Some messages failed to send:", results);
      return new Response(
        JSON.stringify({ error: "Failed to send some messages" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Messages sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
