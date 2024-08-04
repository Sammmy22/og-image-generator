export const config = {
  runtime: "edge",
};

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content } = body;
  return new Response(JSON.stringify({ prompt }));
}
