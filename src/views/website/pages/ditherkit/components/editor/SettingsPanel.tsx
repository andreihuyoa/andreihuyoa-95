import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

import {
  algorithmInfo,
  histogram,
  PALETTES,
  parseHex,
  toHex,
  type Pixels,
  type RGB,
} from "../../../../../../lib/ditherEngine";
import type {
  EditorColorMode,
  EditorSettings,
} from "../../../../../../lib/ditherkit/editorSettings";
import { useThemeChange } from "../useThemeChange";

interface SettingsPanelProps {
  settings: EditorSettings;
  source: Pixels | null;
  onChange: (patch: Partial<EditorSettings>) => void;
  onExtractPalette: () => void;
  onImportPalette: (file: File) => void;
}

interface RangeProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  format?: (value: number) => string;
  onChange: (value: number) => void;
}

/** A labelled slider with its value printed in mono. */
const Range = ({
  id,
  label,
  min,
  max,
  step = 1,
  value,
  format = String,
  onChange,
}: RangeProps): ReactElement => (
  <div className="text-dk-ink-2 grid grid-cols-[64px_minmax(0,1fr)_40px] items-center gap-2.5 text-[13px]">
    <label htmlFor={id}>{label}</label>
    <input
      className="accent-dk-accent w-full"
      id={id}
      max={max}
      min={min}
      onChange={(event) => onChange(Number(event.target.value))}
      step={step}
      type="range"
      value={value}
    />
    <output
      className="font-dk-mono text-dk-ink text-right text-xs tabular-nums"
      htmlFor={id}
    >
      {format(value)}
    </output>
  </div>
);

interface BlockProps {
  title: string;
  summary: string;
  children: ReactNode;
}

/** One settings group with a mono title and a live summary on the right. */
const Block = ({ title, summary, children }: BlockProps): ReactElement => (
  <div className="border-dk-line grid gap-3 border-b px-4.5 py-4">
    <h3 className="font-dk-mono m-0 flex justify-between text-xs font-medium tracking-[0.12em] uppercase">
      {title}
      <small className="text-dk-muted font-normal tracking-[0.04em] normal-case tabular-nums">
        {summary}
      </small>
    </h3>
    {children}
  </div>
);

interface SwatchProps {
  color: RGB;
  label: string;
  onChange?: (color: RGB) => void;
}

/** A color chip with its hex code; clicking an editable one opens the picker. */
const Swatch = ({ color, label, onChange }: SwatchProps): ReactElement => {
  const hex = toHex(color);

  return (
    <label
      className={`border-dk-line bg-dk-panel-2 font-dk-mono text-dk-ink-2 focus-within:outline-dk-accent relative inline-flex h-8.5 items-center gap-2 border pr-2.5 pl-1.5 text-[11px] tabular-nums focus-within:outline-2 focus-within:outline-offset-1 ${onChange ? "hover:border-dk-muted hover:text-dk-ink cursor-pointer" : ""}`}
      title={onChange ? "Change this color" : undefined}
    >
      <span
        className="border-dk-line block size-5.5 shrink-0 border"
        style={{ backgroundColor: hex }}
      />
      {hex}
      {onChange ? (
        <input
          aria-label={`${label}, ${hex}`}
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(event) => {
            const next = parseHex(event.target.value);
            if (next) {
              onChange(next);
            }
          }}
          type="color"
          value={hex}
        />
      ) : null}
    </label>
  );
};

const MODES: { id: EditorColorMode; label: string }[] = [
  { id: "mono", label: "mono" },
  { id: "tone", label: "tone ramp" },
  { id: "palette", label: "palette" },
];

const chipButton =
  "border-dk-muted text-dk-ink-2 hover:text-dk-ink font-dk-mono h-7 cursor-pointer border border-dashed bg-transparent px-2.5 text-[11px]";

/**
 * The editor's right-hand pane: color mode and palette, levels over the
 * image's histogram, pixel scale, and cell size and angle for patterns that
 * have them.
 */
export const SettingsPanel = ({
  settings,
  source,
  onChange,
  onExtractPalette,
  onImportPalette,
}: SettingsPanelProps): ReactElement => {
  const histogramRef = useRef<HTMLCanvasElement>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const family = algorithmInfo(settings.algorithm).family;
  const hasCell =
    family === "halftone" || family === "mosaic" || family === "modulation";

  const drawHistogram = (): void => {
    const canvas = histogramRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !source) {
      return;
    }
    const bins = histogram(source);
    const columns = 64;
    const grouped = Array.from({ length: columns }, (_, column) =>
      bins
        .slice(column * 4, column * 4 + 4)
        .reduce((sum, value) => sum + value, 0),
    );
    const max = Math.max(1, ...grouped);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = getComputedStyle(canvas)
      .getPropertyValue("--dk-muted")
      .trim();
    grouped.forEach((value, column) => {
      const height = (value / max) * (canvas.height - 2);
      context.fillRect(
        column * (canvas.width / columns),
        canvas.height - height,
        canvas.width / columns - 1,
        height,
      );
    });
  };

  useEffect(drawHistogram);
  useThemeChange(drawHistogram);

  const colorSummary =
    settings.colorMode === "palette"
      ? `${settings.palette.length} colors`
      : settings.colorMode === "tone"
        ? `${settings.steps} steps`
        : "two colors";

  return (
    <div className="max-[1080px]:grid max-[1080px]:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
      <Block summary={colorSummary} title="color">
        <div
          aria-label="Color mode"
          className="bg-dk-panel-2 grid grid-cols-3 gap-0.75 p-0.75"
          role="group"
        >
          {MODES.map((mode) => (
            <button
              aria-pressed={settings.colorMode === mode.id}
              className="aria-pressed:bg-dk-ink aria-pressed:text-dk-ground h-8 cursor-pointer border-0 bg-transparent text-[13px]"
              key={mode.id}
              onClick={() => onChange({ colorMode: mode.id })}
              type="button"
            >
              {mode.label}
            </button>
          ))}
        </div>

        {settings.colorMode === "palette" ? (
          <>
            <label className="text-dk-ink-2 grid gap-1.5 text-[13px]">
              built-in palette
              <select
                className="border-dk-line bg-dk-panel-2 text-dk-ink h-8 border px-2"
                onChange={(event) => {
                  const palette = PALETTES.find(
                    (item) => item.id === event.target.value,
                  );
                  if (palette) {
                    onChange({ palette: palette.colors });
                  }
                }}
                value=""
              >
                <option disabled value="">
                  choose one
                </option>
                {PALETTES.map((palette) => (
                  <option key={palette.id} value={palette.id}>
                    {palette.name} · {palette.colors.length}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {settings.palette.map((color, index) => (
                <Swatch
                  color={color}
                  key={`${index}-${toHex(color)}`}
                  label={`Palette color ${index + 1}`}
                  onChange={(next) =>
                    onChange({
                      palette: settings.palette.map((item, i) =>
                        i === index ? next : item,
                      ),
                    })
                  }
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                className={chipButton}
                onClick={onExtractPalette}
                type="button"
              >
                from image
              </button>
              <button
                className={chipButton}
                onClick={() => importRef.current?.click()}
                type="button"
              >
                import .ase .aco .gpl
              </button>
              <input
                accept=".ase,.aco,.gpl"
                aria-label="Import a palette file"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (file) {
                    onImportPalette(file);
                  }
                }}
                ref={importRef}
                type="file"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            <Swatch
              color={parseHex(settings.dark) ?? [0, 0, 0]}
              label="Dark color"
              onChange={
                settings.colorMode === "tone"
                  ? (next) => onChange({ dark: toHex(next) })
                  : undefined
              }
            />
            <Swatch
              color={parseHex(settings.light) ?? [255, 255, 255]}
              label="Light color"
              onChange={
                settings.colorMode === "tone"
                  ? (next) => onChange({ light: toHex(next) })
                  : undefined
              }
            />
          </div>
        )}
        {settings.colorMode === "tone" ? (
          <Range
            id="dk-steps"
            label="steps"
            max={8}
            min={2}
            onChange={(steps) => onChange({ steps })}
            value={settings.steps}
          />
        ) : null}
      </Block>

      <Block
        summary={`${settings.inBlack} · ${settings.gamma.toFixed(2)} · ${settings.inWhite}`}
        title="levels"
      >
        <canvas
          aria-hidden="true"
          className="block h-13.5 w-full"
          height={54}
          ref={histogramRef}
          width={252}
        />
        <Range
          id="dk-black"
          label="black"
          max={200}
          min={0}
          onChange={(inBlack) =>
            onChange({ inBlack: Math.min(inBlack, settings.inWhite - 10) })
          }
          value={settings.inBlack}
        />
        <Range
          format={(value) => value.toFixed(2)}
          id="dk-gamma"
          label="gamma"
          max={3}
          min={0.3}
          onChange={(gamma) => onChange({ gamma })}
          step={0.01}
          value={settings.gamma}
        />
        <Range
          id="dk-white"
          label="white"
          max={255}
          min={55}
          onChange={(inWhite) =>
            onChange({ inWhite: Math.max(inWhite, settings.inBlack + 10) })
          }
          value={settings.inWhite}
        />
        <label
          className="text-dk-ink-2 flex items-center justify-between text-[13px]"
          htmlFor="dk-invert"
        >
          invert
          <input
            checked={settings.invert}
            className="accent-dk-accent size-4"
            id="dk-invert"
            onChange={(event) => onChange({ invert: event.target.checked })}
            type="checkbox"
          />
        </label>
      </Block>

      <Block
        summary={`${settings.pixelSize} px${hasCell ? ` · cell ${settings.cell}` : ""}`}
        title="scale"
      >
        <Range
          id="dk-pixel"
          label="pixel"
          max={8}
          min={1}
          onChange={(pixelSize) => onChange({ pixelSize })}
          value={settings.pixelSize}
        />
        {hasCell ? (
          <Range
            id="dk-cell"
            label="cell"
            max={24}
            min={3}
            onChange={(cell) => onChange({ cell })}
            value={settings.cell}
          />
        ) : null}
        {family === "halftone" ? (
          <Range
            format={(value) => `${value}°`}
            id="dk-angle"
            label="angle"
            max={90}
            min={0}
            onChange={(angle) => onChange({ angle })}
            value={settings.angle}
          />
        ) : null}
      </Block>
    </div>
  );
};
