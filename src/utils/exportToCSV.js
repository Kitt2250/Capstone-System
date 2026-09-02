export function downloadCSV(data, filename) {
    if (!data || data.length === 0) {
        console.warn('No data to export.');
        return;
    }

    const headers = Object.keys(data[0]);
    
    // Create CSV rows
    const csvRows = [];
    csvRows.push(headers.join(',')); // Add headers

    for (const row of data) {
        const values = headers.map(header => {
            const val = row[header];
            // Escape quotes and wrap in quotes if it contains comma, newline or quotes
            if (val !== null && val !== undefined) {
                const str = String(val);
                if (str.includes(',') || str.includes('\n') || str.includes('"')) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            }
            return '';
        });
        csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('url');
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
