import { Billboard as BillboardType } from '@/interfaces';

interface BillboardProps {
  data: BillboardType;
}

const Billboard = ({ data }: BillboardProps) => {
  return (
    <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-8">
      <figure
        style={{ backgroundImage: `url(${data.imgUrl})` }}
        className="relative aspect-square overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1]"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <h1 className="max-w-xs text-3xl font-bold sm:max-w-xl sm:text-5xl lg:text-6xl">
            {data.label}
          </h1>
        </div>
      </figure>
    </div>
  );
};

export default Billboard;
