# UTM Conventions

Use this as the default tracking standard for PSF links, QR codes, social bios, ads, posters, flyers, partner links, and campaign-specific signup paths.

## Default Rule

Use UTM fields this way:

- `utm_source`: the platform, publisher, partner, venue, or origin sending the traffic.
- `utm_medium`: the broad channel type.
- `utm_campaign`: the marketing initiative being measured.
- `utm_content`: the specific creative, placement, version, or link location.
- `utm_term`: paid-search keyword, paid audience, or ad-set label when useful.

Do not use a market or location as `utm_source` unless the source is actually a location-specific venue, event, or partner. For example, `ballina` is usually better as part of `utm_campaign=ballina_launch`, while a specific gym, event, or partner can be the source.

## Naming Rules

- Use lowercase only.
- Use underscores instead of spaces.
- Keep names stable after publishing a link or QR code.
- Keep `utm_medium` to a controlled list.
- Use platform names for digital sources.
- Use venue, partner, publisher, or event names for offline and partnership sources.
- Put location or launch phase in `utm_campaign`, not `utm_source`, unless the source itself is a location-specific organisation.

## Controlled Mediums

Preferred `utm_medium` values:

| Medium | Use For |
| --- | --- |
| `organic_social` | unpaid posts, stories, reels, profile links, DMs where the source is a social platform |
| `paid_social` | paid Meta, TikTok, or other social ads |
| `email` | owned email/newsletter links |
| `referral` | partner, publisher, or third-party links |
| `print` | printed cards, flyers, posters, stickers, handouts, QR codes on physical material |
| `poster` | optional narrower label if posters need to be separated from other print |
| `flyer` | optional narrower label if flyers need to be separated from other print |
| `qr` | only use when the channel needs to be QR-specific and print/poster/flyer is not enough |
| `paid_search` | paid search ads |
| `organic_search` | search traffic where manually tagged links are relevant |

Prefer `print` as the default for offline physical collateral. Use `utm_content` to describe whether it was a card, poster, flyer, sticker, or sign.

## Examples

| Situation | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` |
| --- | --- | --- | --- | --- |
| Instagram bio link | `instagram` | `organic_social` | `always_on` | `bio_link` |
| Instagram story | `instagram` | `organic_social` | `ballina_launch` | `story_01` |
| Instagram reel | `instagram` | `organic_social` | `ballina_launch` | `reel_01` |
| Instagram paid ad | `instagram` | `paid_social` | `ballina_launch` | `ad_creative_01` |
| Facebook organic post | `facebook` | `organic_social` | `ballina_launch` | `post_01` |
| Facebook paid ad | `facebook` | `paid_social` | `ballina_launch` | `ad_creative_01` |
| TikTok organic video | `tiktok` | `organic_social` | `ballina_launch` | `video_01` |
| TikTok paid ad | `tiktok` | `paid_social` | `ballina_launch` | `ad_creative_01` |
| Printed card handed out generally | `offline` | `print` | `ballina_launch` | `card_v1` |
| Event handout card | `event_name` | `print` | `ballina_launch` | `card_v1` |
| Gym poster | `gym_name` | `print` | `ballina_launch` | `poster_a3_front_desk_v1` |
| Gym flyer | `gym_name` | `print` | `ballina_launch` | `flyer_a5_counter_v1` |
| Partner link | `partner_name` | `referral` | `ballina_launch` | `newsletter_cta` |
| PSF newsletter CTA | `pinchy_newsletter` | `email` | `ballina_launch` | `main_cta` |

## Ballina Launch Defaults

For the first general Ballina card or QR code:

```text
https://www.pinchyslabface.com?utm_source=offline&utm_medium=print&utm_campaign=ballina_launch&utm_content=card_v1
```

For a specific event:

```text
https://www.pinchyslabface.com?utm_source=event_name&utm_medium=print&utm_campaign=ballina_launch&utm_content=card_v1
```

For a specific gym poster:

```text
https://www.pinchyslabface.com?utm_source=gym_name&utm_medium=print&utm_campaign=ballina_launch&utm_content=poster_a3_front_desk_v1
```

Replace `event_name` and `gym_name` with real lowercase underscore names before publishing.

## Custom Attributes Later

If PSF needs more detail than normal UTM fields support, add internal fields in the CRM/database rather than overloading UTM names. Useful future attributes:

- `market`: `ballina`, `melbourne`, `brisbane`, etc.
- `asset_type`: `card`, `poster`, `flyer`, `sticker`, `banner`.
- `venue_type`: `gym`, `event`, `school`, `retail`, `partner`.
- `audience`: `climbers`, `parents`, `coaches`, `gyms`, `brands`.
- `offer`: `waitlist`, `giveaway`, `newsletter_signup`, `event_alerts`.

For public links, keep standard UTM parameters clean and readable.
