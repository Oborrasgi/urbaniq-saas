import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return Response.json(
        { success: false, error: "Verification token is required" },
        { status: 400 }
      );
    }

    const result = await verifyEmailToken(token);

    if (!result.success) {
      return Response.json({ success: false, error: result.error }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (error) {
    console.error("Email verification API error:", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

async function verifyEmailToken(
  token: string
): Promise<{ success: boolean; email?: string; error?: string }> {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token }
    });

    if (!verificationToken) {
      return { success: false, error: "Invalid verification token" };
    }

    if (verificationToken.expires < new Date()) {
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id }
      });

      return { success: false, error: "Verification token has expired" };
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() }
    });

    // Clean up used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });

    return { success: true, email: verificationToken.identifier };
  } catch (error) {
    console.error("Email verification error:", error);
    return { success: false, error: "Failed to verify email" };
  }
}
