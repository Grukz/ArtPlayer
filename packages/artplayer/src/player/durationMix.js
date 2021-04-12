import { def } from '../utils';

export default function durationMix(art, player) {
    def(player, 'duration', {
        get: () => {
            const { duration } = art.template.$video;
            if (duration === Infinity) return 0;
            return duration || 0;
        },
    });
}
