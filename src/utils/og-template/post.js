import satori from "satori";
import fs from "node:fs";
import path from "node:path";

function safeText(text) {
  const emojiPattern = /[^\x00-\x7F]+/gu;
  return text.replace(emojiPattern, "").trim();
}

function truncate(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "...";
}

export default async function postOgImage(post) {
  const root = process.cwd();
  const monoBold = fs.readFileSync(path.join(root, "public/fonts/ibm-plex-mono-bold.ttf"));
  const monoRegular = fs.readFileSync(path.join(root, "public/fonts/ibm-plex-mono-regular.ttf"));
  const caveatBold = fs.readFileSync(path.join(root, "public/fonts/caveat-bold.ttf"));
  const caveatRegular = fs.readFileSync(path.join(root, "public/fonts/caveat-regular.ttf"));

  const title = truncate(safeText(post.data.title), 80);
  const description = truncate(safeText(post.data.description || ""), 120);
  const tags = (post.data.tags || []).slice(0, 4);
  const date = post.data.date
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.data.date))
    : "";

  const tagElements = tags.map((tag) => ({
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        padding: "4px 12px",
        backgroundColor: "rgba(210, 10, 19, 0.15)",
        border: "1px solid rgba(210, 10, 19, 0.4)",
        borderRadius: "4px",
        fontSize: 16,
        color: "#e8343d",
        fontFamily: "IBM Plex Mono",
      },
      children: `#${tag}`,
    },
  }));

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "60px 70px",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                backgroundColor: "#d20a13",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "4px",
                backgroundColor: "#d20a13",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "40px",
                right: "50px",
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(210,10,19,0.06) 0%, transparent 70%)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flex: "1",
                justifyContent: "center",
                maxWidth: "85%",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "30px",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "10px",
                            height: "10px",
                            backgroundColor: "#d20a13",
                            borderRadius: "50%",
                          },
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: 22,
                            color: "#d20a13",
                            fontFamily: "Caveat",
                            fontWeight: 700,
                            letterSpacing: "0.02em",
                          },
                          children: "Patel of Thought",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 64,
                      fontWeight: 700,
                      color: "#f4f4f1",
                      lineHeight: 1.15,
                      fontFamily: "Caveat",
                      margin: 0,
                    },
                    children: title,
                  },
                },
                description
                  ? {
                      type: "p",
                      props: {
                        style: {
                          fontSize: 20,
                          color: "#888a8f",
                          lineHeight: 1.5,
                          fontFamily: "IBM Plex Mono",
                          margin: 0,
                          marginTop: "20px",
                        },
                        children: description,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    },
                    children: tagElements,
                  },
                },
                date
                  ? {
                      type: "span",
                      props: {
                        style: {
                          fontSize: 18,
                          color: "#555a5f",
                          fontFamily: "IBM Plex Mono",
                        },
                        children: date,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [
        {
          name: "IBM Plex Mono",
          data: monoBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "IBM Plex Mono",
          data: monoRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Caveat",
          data: caveatBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Caveat",
          data: caveatRegular,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );

  return svg;
}
