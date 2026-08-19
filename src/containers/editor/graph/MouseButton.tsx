import { useEffect } from "react";
import { detectOS } from "@/lib/utils";
import { useStatusStore } from "@/stores/statusStore";
import { ControlButton } from "@xyflow/react";
import { Mouse, Touchpad } from "lucide-react";
import { useTranslations } from "next-intl";
import { useShallow } from "zustand/shallow";

export default function MouseButton() {
  const t = useTranslations();
  const { isTouchpad, setIsTouchpad } = useStatusStore(
    useShallow((state) => ({
      isTouchpad: state.isTouchpad,
      setIsTouchpad: state.setIsTouchpad,
    })),
  );

  useEffect(() => {
    if (isTouchpad === undefined) {
      setIsTouchpad(detectOS() === "Mac");
    }
  }, []);

  return (
    <ControlButton
      title={t("switch_mouse_touchpad")}
      aria-label={t("switch_mouse_touchpad")}
      onClick={() => setIsTouchpad(!isTouchpad)}
    >
      {isTouchpad ? <Touchpad style={{ fill: "none" }} /> : <Mouse style={{ fill: "none" }} />}
    </ControlButton>
  );
}
