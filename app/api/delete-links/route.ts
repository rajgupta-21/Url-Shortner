export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();
  } catch (error) {}
}
