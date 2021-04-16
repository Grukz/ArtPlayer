import { errorHandle, def } from '../utils';

export default function flipMix(art, player) {
    const {
        template: { $player },
        i18n,
        notice,
    } = art;

    def(player, 'flip', {
        get() {
            return $player.dataset.flip;
        },
        set(flip) {
            if (!flip) flip = 'normal';

            const flipList = ['normal', 'horizontal', 'vertical'];
            errorHandle(flipList.includes(flip), `'flip' only accept ${flipList.toString()} as parameters`);

            if (flip === 'normal') {
                delete $player.dataset.flip;
            } else {
                player.rotate = false;
                $player.dataset.flip = flip;
            }

            const word = flip.replace(flip[0], flip[0].toUpperCase());
            notice.show = `${i18n.get('Flip')}: ${i18n.get(word)}`;
            art.emit('flip', flip);
        },
    });

    def(player, 'flipReset', {
        set(value) {
            if (value && player.flip) {
                const { flip } = player;
                player.flip = flip;
            }
        },
    });
}
