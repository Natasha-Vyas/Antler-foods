export default function DashboardNewRestaurantPage() {
  return (
    <section className="space-y-5">
      <h1 className="text-[40px] font-semibold tracking-tight text-[#101827]">New restaurant</h1>

      <div className="overflow-hidden rounded-3xl border border-[#d7e2e6] bg-white">
        <div className="border-b border-[#d8e3e7] px-8 py-5">
          <h2 className="text-[28px] font-semibold text-[#111827]">New restaurant</h2>
        </div>

        <div className="space-y-8 p-8">
          <div className="flex flex-wrap items-center gap-4 text-[18px] text-[#6b7280]">
            <StepChip number={1} active label="Restaurant info" />
            <StepConnector />
            <StepChip number={2} label="Business info" />
            <StepConnector />
            <StepChip number={3} label="Additional Restaurants" />
          </div>

          <div className="space-y-4">
            <h3 className="text-[24px] font-semibold text-[#111827]">Create Restaurant</h3>
            <p className="border-l-4 border-[#ebc54a] pl-4 text-[16px] leading-relaxed text-[#111827]">
              Please select whether you are creating a completely new restaurant/franchise
              or adding this restaurant to an existing franchise in our system.
            </p>
            <div className="space-y-3 text-[14px] text-[#111827]">
              <OptionRow label="Create a new restaurant/franchise" />
              <OptionRow label="Add this restaurant to an existing franchise" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[24px] font-semibold underline">Associated Restaurant(s)</h4>
            <div className="flex min-h-[140px] max-w-[390px] items-center justify-center rounded-2xl border border-[#dce5ea] bg-white text-[20px] font-semibold text-[#111827]">
              + Add restaurant
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-[#d8e3e7] bg-[#f3f7f9] px-8 py-5">
          <button
            type="button"
            disabled
            className="rounded-xl border border-[#d2dee4] bg-[#f8fbfc] px-8 py-2.5 text-[18px] font-medium text-[#b0bac3]"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}

interface StepChipProps {
  number: number;
  label: string;
  active?: boolean;
}

function StepChip({ number, label, active = false }: StepChipProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold ${
          active ? "bg-[#60c783] text-white" : "bg-[#eceef0] text-[#616d78]"
        }`}
      >
        {number}
      </span>
      <span className={active ? "text-[#111827]" : "text-[#78838d]"}>{label}</span>
    </div>
  );
}

function StepConnector() {
  return <span className="h-px w-16 bg-[#dfe5e9]" />;
}

interface OptionRowProps {
  label: string;
}

function OptionRow({ label }: OptionRowProps) {
  return (
    <label className="flex items-center gap-3">
      <span className="h-4 w-4 rounded-full border border-[#cdd8de]" />
      <span>{label}</span>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#111827] text-[10px] font-semibold">
        i
      </span>
    </label>
  );
}
