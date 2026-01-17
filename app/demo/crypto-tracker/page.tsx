import { redirect } from 'next/navigation';

export default function CryptoTrackerPage() {
    // Redirect to Tetris game (the actual demo we created)
    redirect('/demo/tetris');
}
