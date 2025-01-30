// components/pdf.tsx
declare const html2pdf: {
  (): {
    from: (element: HTMLElement) => {
      set: (options: {
        margin?: number | [number, number, number, number];
        filename?: string;
        image?: { type: string; quality: number };
        html2canvas?: { scale: number };
        jsPDF?: { unit: string; format: string; orientation: string };
      }) => {
        save: () => void;
      };
    };
  };
};

export function downloadPDF() {
  const element = document.querySelector('main');
  if (!element) {
    console.error('Element not found');
    return;
  }

  const options = {
    margin:       10,
    filename:     'CV_Rifqi_Syahrizal.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 3 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(element).set(options).save();
}