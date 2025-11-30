
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">α</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              ALPHAQUBIT <span className="font-normal text-stone-500">2024</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">简介</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">表面码</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">影响</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">作者</a>
            <a 
              href="https://doi.org/10.1038/s41586-024-08148-8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              查看论文
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">简介</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">科学原理</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">影响</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">作者</a>
            <a 
              href="https://doi.org/10.1038/s41586-024-08148-8" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer"
            >
              查看论文
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Nature • 2024年11月
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            AlphaQubit <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">用于量子纠错的人工智能</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            一个基于Transformer的循环神经网络，能够以前所未有的精度学习解码表面码。
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>探索</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">简介</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">噪声壁垒</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">构</span>建大规模量子计算机需要修正物理系统中不可避免出现的错误。目前最先进的技术是**表面码**，它通过许多物理量子比特冗余地编码信息。
              </p>
              <p>
                然而，解释这些代码中的噪声信号——即所谓的“解码”——是一项巨大的挑战。串扰和泄漏等复杂的噪声效应会混淆标准算法。<strong className="text-stone-900 font-medium">AlphaQubit</strong> 利用机器学习直接从量子处理器中学习这些复杂的错误模式，实现了远超人工设计算法的精度。
              </p>
            </div>
          </div>
        </section>

        {/* The Science: Surface Code */}
        <section id="science" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> 系统
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">表面码</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           在表面码中，“数据量子比特”保存量子信息，而散布在它们之间的“稳定子量子比特”充当监视者。它们测量奇偶校验（X型和Z型）以检测错误，而不会破坏量子态。
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            当数据量子比特翻转时，相邻的稳定子会亮起。这些亮起的模式被称为“校验子（syndrome）”。解码器的工作是观察校验子并猜测哪个数据量子比特发生了翻转。
                        </p>
                    </div>
                    <div>
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* The Science: Transformer Decoder */}
        <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                {/* Decorative background pattern - Gold/Stone theme */}
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            创新
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">神经解码</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            标准解码器假设错误是简单的、独立的。但真实的硬件要混乱得多。AlphaQubit 使用**循环Transformer**架构，将解码视为序列预测问题。
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            它摄取稳定子测量的历史记录，并使用“软”模拟信息（概率，而不仅仅是二进制的0和1）来对逻辑错误做出高度明智的预测。
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* The Science: Results */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">超越标准</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        AlphaQubit 在 Google 的 Sycamore 处理器和精确模拟中进行了测试。它始终优于行业标准“最小权重完美匹配”（MWPM），有效地使量子计算机看起来比实际更干净。
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>

        {/* Impact */}
        <section id="impact" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Sycamore 处理器环境模拟</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">影响</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">迈向容错</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        即使代码距离增加（最高达到距离 11），AlphaQubit 仍保持其优势。它能处理现实中的噪声，包括经常削弱标准解码器的串扰和泄漏效应。
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        通过直接从数据中学习，机器学习解码器可以适应每个量子处理器的独特怪癖，可能会降低实用量子计算的硬件要求。
                    </p>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            “我们的工作展示了机器学习通过直接从数据中学习从而超越人工设计算法的能力，凸显了机器学习作为量子计算机解码强有力竞争者的地位。”
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Bausch 等, Nature (2024)</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">研究团队</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">主要贡献者</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Google DeepMind 与 Google Quantum AI 的合作成果。</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <AuthorCard 
                        name="Johannes Bausch" 
                        role="Google DeepMind" 
                        delay="0s" 
                    />
                    <AuthorCard 
                        name="Andrew W. Senior" 
                        role="Google DeepMind" 
                        delay="0.1s" 
                    />
                    <AuthorCard 
                        name="Francisco J. H. Heras" 
                        role="Google DeepMind" 
                        delay="0.2s" 
                    />
                    <AuthorCard 
                        name="Thomas Edlich" 
                        role="Google DeepMind" 
                        delay="0.3s" 
                    />
                    <AuthorCard 
                        name="Alex Davies" 
                        role="Google DeepMind" 
                        delay="0.4s" 
                    />
                    <AuthorCard 
                        name="Michael Newman" 
                        role="Google Quantum AI" 
                        delay="0.5s" 
                    />
                </div>
                <div className="text-center mt-12">
                    <p className="text-stone-500 italic">以及许多在硬件、理论和工程方面做出贡献的其他人员。</p>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">AlphaQubit</div>
                <p className="text-sm">可视化展示论文：“Learning high-accuracy error decoding for quantum processors”</p>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            基于 2024 年发表于 Nature 的研究。由 AI 生成。
        </div>
      </footer>
    </div>
  );
};

export default App;
