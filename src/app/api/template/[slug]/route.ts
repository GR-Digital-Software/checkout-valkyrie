import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Construct the API URL using the slug
    const apiUrl = `${process.env.PUBLIC_API_URL}/checkouts/templates/${slug}`;

    // Make the API request
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        accept: "*/*", // Include the Accept header
      },
    });

    // Handle errors from the API
    if (!apiResponse.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch data from the API: ${apiResponse.statusText}`,
        },
        { status: apiResponse.status }
      );
    }

    // Parse the API response
    const data = await apiResponse.json();

    // Return the API response as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
}
