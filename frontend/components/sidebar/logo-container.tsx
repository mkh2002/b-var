import { LogoIcon } from "../icons/logo-icon";

export const LogoContainer = () => {
  return (
    <div className="w-full cursor-pointer hidden sm:block">
      <div className="flex">
        <div className="items-center flex gap-4">
          <div className="border border-divider p-3 rounded-small">
            <LogoIcon className="w-6 h-6 opacity-70" />
          </div>

          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl font-medium text-default-900 -mb-4 whitespace-nowrap">
              CAT{"<"}H
            </h3>
            <span className="text-xs font-medium text-default-500">
              Catch the moment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
