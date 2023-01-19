import Link from "next/link";

type Props = {
  hash: string;
  className?: string;
};

function TxHash({ hash, className }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <p className={className}>Tx:</p>
      <Link
        target="_blank"
        href={`https://mumbai.polygonscan.com/tx/${hash}`}
        className={`cursor-pointer hover:text-blue-600 hover:underline ${className}`}
      >
        {hash?.slice(0, 10) + "..."}
      </Link>
    </div>
  );
}

export default TxHash;
