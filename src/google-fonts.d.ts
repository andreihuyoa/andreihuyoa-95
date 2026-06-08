declare module "google-fonts" {
  type FontSpec = boolean | number | number[];

  interface GoogleFonts {
    (fonts: Record<string, FontSpec>): string;
    add(fonts: Record<string, FontSpec>): HTMLLinkElement;
  }

  const googleFonts: GoogleFonts;
  export default googleFonts;
}
