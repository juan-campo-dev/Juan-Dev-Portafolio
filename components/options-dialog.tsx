"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOverlayFocus } from "@/components/shared/overlay-focus-provider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: {
    condition_mode: "concat" | "fuse";
    quality: "high" | "medium" | "low" | "extra-low";
    geometry_file_format: "glb" | "usdz" | "fbx" | "obj" | "stl";
    use_hyper: boolean;
    tier: "Regular" | "Sketch";
    TAPose: boolean;
    material: "PBR" | "Shaded";
  };
  onOptionsChange: (options: any) => void;
}

export default function OptionsDialog({
  open,
  onOpenChange,
  options,
  onOptionsChange,
}: OptionsDialogProps) {
  const [localOptions, setLocalOptions] = useState(options);
  const contentRef = useRef<HTMLDivElement>(null);

  useOverlayFocus("options-dialog", open);

  // Update local options when props change
  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  // Mientras el modal esté abierto, desactivamos `scroll-smooth` global
  // para que cualquier reposicionamiento interno del browser/Radix no
  // dispare una animación de scroll hasta secciones lejanas (Contacto).
  useEffect(() => {
    if (!open) return;

    const htmlStyle = document.documentElement.style;
    const previousScrollBehavior = htmlStyle.scrollBehavior;
    const previousScrollY = window.scrollY;

    htmlStyle.scrollBehavior = "auto";

    return () => {
      htmlStyle.scrollBehavior = previousScrollBehavior;
      // Si algo intentó mover el scroll mientras estaba abierto, lo
      // restauramos a la posición original al cerrar.
      if (Math.abs(window.scrollY - previousScrollY) > 4) {
        window.scrollTo({ left: 0, top: previousScrollY, behavior: "auto" });
      }
    };
  }, [open]);

  const handleChange = (key: string, value: any) => {
    setLocalOptions((prev) => {
      const updated = { ...prev, [key]: value };
      onOptionsChange(updated);
      return updated;
    });
  };

  const handleDialogOpenAutoFocus = (event: Event) => {
    event.preventDefault();
    requestAnimationFrame(() => {
      contentRef.current?.focus({ preventScroll: true });
    });
  };

  const preventDialogCloseAutoFocus = (event: Event) => {
    event.preventDefault();
  };

  const windowControls = (
    <div className="flex space-x-1 md:space-x-2">
      {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((color) => (
        <div
          key={color}
          className={`${color} h-2 w-2 rounded-full opacity-80 shadow-lg md:h-3 md:w-3`}
        />
      ))}
    </div>
  );

  const content = (
    <div className="py-2">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 rounded-lg border border-[#00f0ff]/20 bg-black/40">
          <TabsTrigger
            value="basic"
            className="rounded-lg tracking-normal data-[state=active]:bg-[#00f0ff]/15 data-[state=active]:text-[#00f0ff]"
          >
            Ajustes Básicos
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="rounded-lg tracking-normal data-[state=active]:bg-[#00f0ff]/15 data-[state=active]:text-[#00f0ff]"
          >
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-mono tracking-normal">
                Calidad
              </Label>
              <Select
                value={localOptions.quality}
                onValueChange={(value) => handleChange("quality", value)}
              >
                <SelectTrigger className="rounded-lg border-[#00f0ff]/20 bg-black/60 text-white tracking-normal">
                  <SelectValue placeholder="Seleccionar calidad" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-[#00f0ff]/20 bg-black/90 text-white">
                  <SelectItem
                    value="high"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    Alta (50k)
                  </SelectItem>
                  <SelectItem
                    value="medium"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    Media (18k)
                  </SelectItem>
                  <SelectItem
                    value="low"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    Baja (8k)
                  </SelectItem>
                  <SelectItem
                    value="extra-low"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    Extra Baja (4k)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-mono tracking-normal">
                Formato
              </Label>
              <Select
                value={localOptions.geometry_file_format}
                onValueChange={(value) =>
                  handleChange("geometry_file_format", value)
                }
              >
                <SelectTrigger className="rounded-lg border-[#00f0ff]/20 bg-black/60 text-white tracking-normal">
                  <SelectValue placeholder="Seleccionar formato" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-[#00f0ff]/20 bg-black/90 text-white">
                  <SelectItem
                    value="glb"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    GLB
                  </SelectItem>
                  <SelectItem
                    value="usdz"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    USDZ
                  </SelectItem>
                  <SelectItem
                    value="fbx"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    FBX
                  </SelectItem>
                  <SelectItem
                    value="obj"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    OBJ
                  </SelectItem>
                  <SelectItem
                    value="stl"
                    className="tracking-normal hover:bg-[#111111] focus:bg-[#111111]"
                  >
                    STL
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row items-center justify-between rounded-lg border border-[#00f0ff]/20 bg-black/40 p-3 shadow-sm">
              <div>
                <Label className="text-white font-mono tracking-normal">
                  Usar Hyper
                </Label>
                <p className="text-gray-400 text-xs tracking-normal">
                  Mejores detalles
                </p>
              </div>
              <Switch
                checked={localOptions.use_hyper}
                onCheckedChange={(checked) =>
                  handleChange("use_hyper", checked)
                }
              />
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border border-[#00f0ff]/20 bg-black/40 p-3 shadow-sm">
              <div>
                <Label className="text-white font-mono tracking-normal">
                  Pose T/A
                </Label>
                <p className="text-gray-400 text-xs tracking-normal">
                  Para humanos
                </p>
              </div>
              <Switch
                checked={localOptions.TAPose}
                onCheckedChange={(checked) => handleChange("TAPose", checked)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white font-mono tracking-normal">
              Modo de Condición
            </Label>
            <RadioGroup
              value={localOptions.condition_mode}
              onValueChange={(value) => handleChange("condition_mode", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="concat"
                  id="concat"
                  className="border-white text-white"
                />
                <Label htmlFor="concat" className="text-white tracking-normal">
                  Concatenar (Objeto único, múltiples vistas)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="fuse"
                  id="fuse"
                  className="border-white text-white"
                />
                <Label htmlFor="fuse" className="text-white tracking-normal">
                  Fusionar (Múltiples objetos)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-mono tracking-normal">
              Material
            </Label>
            <RadioGroup
              value={localOptions.material}
              onValueChange={(value) => handleChange("material", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="PBR"
                  id="pbr"
                  className="border-white text-white"
                />
                <Label htmlFor="pbr" className="text-white tracking-normal">
                  PBR
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Shaded"
                  id="shaded"
                  className="border-white text-white"
                />
                <Label htmlFor="shaded" className="text-white tracking-normal">
                  Sombreado
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-mono tracking-normal">
              Nivel de Generación
            </Label>
            <RadioGroup
              value={localOptions.tier}
              onValueChange={(value) => handleChange("tier", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Regular"
                  id="regular"
                  className="border-white text-white"
                />
                <Label htmlFor="regular" className="text-white tracking-normal">
                  Regular (Calidad)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Sketch"
                  id="sketch"
                  className="border-white text-white"
                />
                <Label htmlFor="sketch" className="text-white tracking-normal">
                  Boceto (Velocidad)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={contentRef}
        tabIndex={-1}
        onOpenAutoFocus={handleDialogOpenAutoFocus}
        onCloseAutoFocus={preventDialogCloseAutoFocus}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <DialogHeader className="-mx-6 -mt-6 mb-2 flex flex-row items-center justify-between space-y-0 rounded-t-2xl border-b border-[#00f0ff]/20 bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-[#00f0ff]/10 px-6 py-4 text-left">
          {windowControls}
          <DialogTitle className="truncate text-xl text-[#c2e9fa] font-mono tracking-normal">
            Opciones
          </DialogTitle>
          <div className="h-9 w-9" />
        </DialogHeader>
        <DialogDescription className="sr-only">
          Ajustes de calidad, formato y opciones avanzadas de generación.
        </DialogDescription>
        {content}
        <Button
          onClick={() => onOpenChange(false)}
          className="mt-4 w-full rounded-lg bg-black/60 text-white tracking-normal hover:bg-[#00f0ff]/15 hover:text-[#00f0ff] sm:hidden"
        >
          Aplicar Ajustes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
