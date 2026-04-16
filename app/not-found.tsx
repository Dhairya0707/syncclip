import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-surface font-body min-h-screen flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full border-2 border-black p-12 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
        <div className="font-mono text-[10px] font-bold tracking-[0.3em] text-secondary mb-4 uppercase">PROTOCOL_ERROR</div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-2 relative">
          404
        </h1>
        <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-8">
          DESTINATION_NODE_UNREACHABLE
        </div>
        <p className="font-body text-zinc-600 mb-10 leading-relaxed font-bold italic">
          The requested coordinate does not exist within the active broadsheet protocol.
        </p>
        <Link 
          href="/"
          className="block w-full bg-black text-white font-label font-bold py-6 px-4 border-2 border-black hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
        >
          RETURN TO ROOT
        </Link>
      </div>
      <div className="fixed bottom-6 w-full text-center pointer-events-none">
        <div className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
          © {new Date().getFullYear()} SYNCCLIP PUBLISHING GROUP // ERROR_STATE_HANDLED
        </div>
      </div>
    </div>
  );
}
