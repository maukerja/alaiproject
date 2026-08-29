const SPOTIFY_TOKEN_URL =
    "https://accounts.spotify.com/api/token";

const SPOTIFY_SEARCH_URL =
    "https://api.spotify.com/v1/search";


export default async function handler(
    request,
    response
) {

    if (request.method !== "GET") {

        return response.status(405).json({
            error: "Method not allowed"
        });

    }


    try {

        const clientId =
            process.env.SPOTIFY_CLIENT_ID;

        const clientSecret =
            process.env.SPOTIFY_CLIENT_SECRET;


        if (!clientId || !clientSecret) {

            return response.status(500).json({
                error:
                    "Spotify Client ID atau Client Secret belum diisi"
            });

        }


        /* =========================
           MINTA ACCESS TOKEN
        ========================= */

        const tokenResponse =
            await fetch(
                SPOTIFY_TOKEN_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded",

                        "Authorization":
                            "Basic " +
                            Buffer
                                .from(
                                    `${clientId}:${clientSecret}`
                                )
                                .toString("base64")
                    },

                    body:
                        "grant_type=client_credentials"
                }
            );


        if (!tokenResponse.ok) {

            throw new Error(
                "Gagal mengambil Spotify access token"
            );

        }


        const tokenData =
            await tokenResponse.json();


        const accessToken =
            tokenData.access_token;


        /* =========================
           QUERY DARI WEBSITE
        ========================= */

        const query =
            request.query.q ||
            "chill relaxing music";


        /* =========================
           CARI LAGU
        ========================= */

        const searchResponse =
            await fetch(
                `${SPOTIFY_SEARCH_URL}?q=${encodeURIComponent(query)}&type=track&limit=20`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${accessToken}`
                    }
                }
            );


        if (!searchResponse.ok) {

            throw new Error(
                "Gagal mencari lagu di Spotify"
            );

        }


        const searchData =
            await searchResponse.json();


        const tracks =
            searchData.tracks?.items || [];


        if (tracks.length === 0) {

            return response.status(404).json({
                error:
                    "Lagu tidak ditemukan"
            });

        }


        /* =========================
           PILIH RANDOM
        ========================= */

        const randomTrack =
            tracks[
                Math.floor(
                    Math.random() *
                    tracks.length
                )
            ];


        /* =========================
           KIRIM KE FRONTEND
        ========================= */

        return response.status(200).json({

            id:
                randomTrack.id,

            title:
                randomTrack.name,

            artist:
                randomTrack.artists
                    .map(
                        artist => artist.name
                    )
                    .join(", "),

            image:
                randomTrack.album
                    ?.images?.[0]
                    ?.url || null

        });

    }

    catch (error) {

        console.error(
            "Spotify API error:",
            error
        );


        return response.status(500).json({

            error:
                "Terjadi kesalahan saat mengambil lagu"

        });

    }

}
