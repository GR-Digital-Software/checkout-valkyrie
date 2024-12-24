export default function SubHeader({
  message,
  background: backgroundColor,
  color,
}: {
  message: string;
  background: string;
  color: string;
}) {
  return (
    <div
      className="flex w-full justify-center items-center"
      style={{
        backgroundColor,
      }}
    >
      <p
        className="text-sm font-normal px-[45px] py-[22px]"
        style={{
          color,
        }}
      >
        {message}
      </p>
    </div>
  );
}
