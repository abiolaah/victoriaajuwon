import { Switch } from "../ui/switch";

interface FormSwitchProps {
  isEducation: boolean;
  onToggle: (isEducation: boolean) => void;
}

export const FormSwitch = ({ isEducation, onToggle }: FormSwitchProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-1 bg-zinc-800 p-4 rounded-lg border border-zinc-700">
      <p
        className={`text-sm font-medium ${!isEducation ? "text-white" : "text-zinc-400"}`}
      >
        Work Experience
      </p>

      <Switch checked={isEducation} onCheckedChange={onToggle} />

      <p
        className={`text-sm font-medium ${isEducation ? "text-white" : "text-zinc-400"}`}
      >
        Education
      </p>
    </div>
  );
};
