/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            ":first-child": {
              marginTop: "0",
            },
            ul: {
              padding: "0 1rem",
              margin: "1.25rem 1rem 1.25rem 0.4rem",
              "li p": {
                marginTop: "0.25em",
                marginBottom: "0.25em",
              },
            },
            ol: {
              padding: "0 1rem",
              margin: "1.25rem 1rem 1.25rem 0.4rem",
              "li p": {
                marginTop: "0.25em",
                marginBottom: "0.25em",
              },
            },
            h1: {
              fontSize: "1.4rem",
              lineHeight: "1.1",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            h2: {
              fontSize: "1.2rem",
              lineHeight: "1.1",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            h3: {
              fontSize: "1.1rem",
              lineHeight: "1.1",
              marginTop: "2.5rem",
            },
            h4: {
              fontSize: "1rem",
              lineHeight: "1.1",
              marginTop: "2.5rem",
            },
            h5: {
              fontSize: "1rem",
              lineHeight: "1.1",
              marginTop: "2.5rem",
            },
            h6: {
              fontSize: "1rem",
              lineHeight: "1.1",
              marginTop: "2.5rem",
            },
            code: {
              backgroundColor: "#E9D8FD", // Replace with Tailwind's purple-100 if defined
              borderRadius: "0.4rem",
              color: "#1A202C", // Replace with Tailwind's gray-800 if defined
              fontSize: "0.85rem",
              padding: "0.25em 0.3em",
            },
            pre: {
              backgroundColor: "#1A202C", // Replace with Tailwind's gray-900 if defined
              borderRadius: "0.5rem",
              color: "#FFFFFF", // White
              fontFamily: "'JetBrainsMono', monospace",
              margin: "1.5rem 0",
              padding: "0.75rem 1rem",
              code: {
                background: "none",
                color: "inherit",
                fontSize: "0.8rem",
                padding: "0",
              },
            },
            blockquote: {
              borderLeft: "3px solid #CBD5E0", // Replace with Tailwind's gray-300 if defined
              margin: "1.5rem 0",
              paddingLeft: "1rem",
            },
            hr: {
              border: "none",
              borderTop: "1px solid #E2E8F0", // Replace with Tailwind's gray-200 if defined
              margin: "2rem 0",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
