import React, { useState } from 'react';
import { ActivityForm } from './components/ActivityForm';
import { ScheduleDisplay } from './components/ScheduleDisplay';
import { PDFSchedule } from './components/PDFSchedule';
import { File as FilePdf } from 'lucide-react';

function App() {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Village Resort - Programação Adultos</h1>
          <a href="#">
            <h4 className="text-lg font-bold text-gray-400 hover:underline">Village Resort - Programação Infantil</h4>
          </a>
          <button
            onClick={() => setShowPDF(!showPDF)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <FilePdf className="w-5 h-5" />
            {showPDF ? 'Voltar' : 'Gerar PDF'}
          </button>
        </div>

        {showPDF ? (
          <PDFSchedule />
        ) : (
          <div className="space-y-8">
            <ActivityForm />
            <ScheduleDisplay />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;