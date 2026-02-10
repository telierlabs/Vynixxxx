
import React, { useState, useRef } from 'react';
import { Upload, Wand2, RefreshCw, Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import { editImageWithAI } from '../services/geminiService';

const EditorView: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!sourceImage || !prompt.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      // Strip metadata prefix from base64
      const base64Data = sourceImage.split(',')[1];
      const mimeType = sourceImage.split(';')[0].split(':')[1];
      
      const result = await editImageWithAI(base64Data, prompt, mimeType);
      if (result) {
        setEditedImage(result);
      }
    } catch (error) {
      console.error("Editing failed:", error);
      alert("Failed to edit image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 md:p-16 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">AI Vision Editor</h1>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">Transform your visuals with generative intelligence</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Workspace */}
        <div className="lg:col-span-2 space-y-8">
          <div className="aspect-video w-full bg-zinc-950 border-2 border-dashed border-white/10 rounded-[3rem] overflow-hidden flex items-center justify-center relative group">
            {editedImage ? (
              <img src={editedImage} className="w-full h-full object-contain" alt="Edited" />
            ) : sourceImage ? (
              <img src={sourceImage} className="w-full h-full object-contain" alt="Source" />
            ) : (
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-zinc-600" size={32} />
                </div>
                <p className="text-zinc-500 uppercase tracking-widest text-sm mb-4">Upload a movie still or poster</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                >
                  Browse Files
                </button>
              </div>
            )}
            
            {/* Overlay Info */}
            {(sourceImage || editedImage) && !isProcessing && (
              <div className="absolute top-6 right-6 flex space-x-2">
                <button 
                  onClick={() => {setSourceImage(null); setEditedImage(null); setPrompt('');}}
                  className="p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-black transition-colors"
                >
                  <RefreshCw size={18} />
                </button>
                {editedImage && (
                  <a 
                    href={editedImage} 
                    download="noirstream_edit.png"
                    className="p-3 bg-white text-black rounded-full hover:scale-110 transition-all"
                  >
                    <Download size={18} />
                  </a>
                )}
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-4 backdrop-blur-sm">
                <Loader2 className="animate-spin text-white" size={48} />
                <p className="uppercase tracking-[0.4em] text-xs font-bold animate-pulse">Processing Masterpiece</p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="hidden" 
            />
            {sourceImage && !editedImage && (
              <p className="text-zinc-500 text-xs italic">Image loaded. Describe your changes below.</p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-8">
          <div className="bg-zinc-950 border border-white/10 p-8 rounded-[3rem] shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <Wand2 className="text-white" size={20} />
              <h3 className="font-bold uppercase tracking-widest text-sm">Magic Console</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-3">Modification Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'Add a vintage noir filter', 'Place the actor in a rainy street', 'Make it look like a 1950s poster'..."
                  className="w-full h-40 bg-black border border-white/20 rounded-2xl p-4 text-sm focus:outline-none focus:border-white transition-colors resize-none placeholder:text-zinc-700"
                />
              </div>

              <button 
                onClick={handleEdit}
                disabled={!sourceImage || !prompt.trim() || isProcessing}
                className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[0.98] transition-all disabled:opacity-30 disabled:hover:scale-100 flex items-center justify-center space-x-3 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <span>Generate Edit</span>
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h4 className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Suggested Edits</h4>
              <div className="flex flex-wrap gap-2">
                {['High Contrast Noir', 'Add Dramatic Fog', 'Anamorphic Flare', 'Film Grain'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setPrompt(tag)}
                    className="text-[10px] border border-white/5 px-3 py-1.5 rounded-full hover:border-white/40 transition-colors uppercase tracking-tight"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
            <p className="text-[10px] text-zinc-500 leading-relaxed font-mono">
              SYSTEM NOTE: Gemini 2.5 Flash Image utilizes advanced neural diffusion to reinterpret visuals based on semantic instructions. Some complex anatomical edits may require refined prompting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorView;
