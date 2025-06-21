export const statusColors: Record<string, string> = {
    'Applied': '#F7E7B6',
    'Interview': '#E9D8FD',
    'Rejected': '#FDE2E1',
    'Offer': '#D1FADF',
    'Saved': '#E0E7FF'
};

export const statusTextColors: Record<string, string> = {
    'Applied': '#7C6F2A',
    'Interview': '#6B21A8',
    'Rejected': '#B91C1C',
    'Offer': '#027A48',
    'Saved': '#2563EB',
};

export function getStatusBg(status: string): string {
    return statusColors[status] || '#E5E7EB';
}

export function getStatusText(status: string): string {
    return statusTextColors[status] || '#374151';
}