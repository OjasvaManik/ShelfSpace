import Landing from "@/components/custom/pages/Landing";
import PageShell from "@/components/custom/misc/PageShell";

export default function Home() {
  return (
      <PageShell>
        <div className={'w-full h-full'}>
            <Landing />
        </div>
      </PageShell>
  );
}
