# Australia Bouldering Market Research Brief

## Purpose

Use this brief to answer a simple business question for PSF:

- is the Australian indoor climbing audience large enough, concentrated enough, and commercially active enough to support a durable newsletter, media, and gym partnership business?

This research should support launch sequencing, city prioritisation, sponsorship potential, and the long-term case for a directory or data product.

## What We Need To Know

### 1. Market size and participation

- How many people in Australia participate in sport climbing, indoor climbing, bouldering, or the broader rock climbing category?
- What is the best available split between indoor and outdoor climbing?
- What is the best available split between bouldering and ropes climbing?
- How has participation changed over time, especially since the Tokyo 2021 and Paris 2024 Olympic cycles?
- Which states and cities appear to have the deepest concentration of climbers?

### 2. Demographics

- Age mix
- Gender mix
- Adult versus child participation
- Metro versus regional participation
- Student, young professional, family, and youth-program segments where evidence exists
- Motivations for participation: fun, fitness, social, identity, competition, community

### 3. Spend and commercial signals

- Participation expenditure where climbing-specific data exists
- Gym pricing benchmarks: casual entry, memberships, packs, intro offers, kids programs, comps, shoe hire
- Evidence of willingness to pay for community, events, coaching, comps, and merch
- Sponsorship or advertising clues from gym media, comps, and community brands

### 4. Supply side

- Total number of indoor climbing gyms in Australia
- Full list of gyms by state and territory
- Facility type for each gym: bouldering-only, ropes-only, mixed
- Major chains versus independents
- Which cities are over-represented
- Which markets appear underserved

### 5. PSF relevance

- Which launch city gives PSF the best mix of audience density and content supply?
- How many gyms and events would a city-first newsletter realistically cover?
- Is there evidence that gyms want more visibility, event promotion, or community media?
- Does the market look big enough for sponsorship, featured listings, or paid promotions later?

## Output Format

The final research output should contain:

1. Executive summary with 5 to 8 key takeaways.
2. Market size section with sourced numbers and confidence levels.
3. Demographic section with sourced numbers and notes.
4. Spend and pricing section with exact examples and ranges.
5. Gym census by state and territory in a table.
6. Chain and independent landscape summary.
7. City prioritisation recommendation for PSF.
8. Open questions and gaps that still need primary research.

Each claim should be marked as one of:

- fact
- estimate
- inference

## Source Hierarchy

Use sources in this order:

1. Australian Sports Commission / AusPlay
2. ABS and state government data
3. Sport Climbing Australia and state climbing associations
4. Indoor Climbing Industry Australia
5. Gym websites and pricing pages
6. High-quality industry reporting and directories

Avoid relying on Reddit or forum anecdotes except as weak supporting colour, not as headline evidence.

## Known Starting Sources

These are useful anchors for the first pass:

- Australian Sports Commission AusPlay results hub:
  [AusPlay results](https://www.ausport.gov.au/clearinghouse/research/ausplay/2015-2023)
- AusPlay participation expenditure key figures:
  [Participation expenditure key figures](https://www.sportaus.gov.au/__data/assets/pdf_file/0007/1100959/AusPlay-Participation-Expenditure-Key-Figures-April-2023.pdf)
- Sport Climbing WA summary of the 2019-20 AusPlay climbing release:
  [AusPlay 2019-20 Survey Data Released](https://www.sportclimbingwa.com.au/news/ausplay-2019-20-survey-data-released)
- ABC reporting on newer AusPlay climbing numbers:
  [Solo games the new winners of Aussie sport](https://www.abc.net.au/news/2024-07-22/sport-trends-changing-australia-climbing-hang-gliding-frisbee/104114052)
- Indoor Climbing Industry Australia:
  [ICIA](https://teal-viola-clrm.squarespace.com/)
- Sport Climbing Australia facility page:
  [SCA Climbing Facilities](https://sportclimbingaustralia.com.au/Climbing-Facilities)
- Mountain Project Australia gym directory:
  [Australia Climbing Gym Directory](https://www.mountainproject.com/gyms/australia)
- Example pricing sources:
  [Climb Fit pricing](https://www.climbfit.com.au/pricing/)
  [Climb Fit membership](https://www.climbfit.com.au/membership-2/)
  [Urban Xtreme climb memberships](https://www.urban-xtreme.com.au/membershipsclimb/)
  [Climber Collective memberships](https://climbercollective.com.au/memberships/)

## Early Evidence Notes

- Fact: Sport Climbing WA published a summary of the 2019-20 AusPlay release showing 218.8 thousand participants in the broad climbing category, including 205.2 thousand adults and 13.6 thousand children.
- Fact: ABC reported on 22 July 2024 that AusPlay estimated more than 100,000 Australians participated in sport climbing, with a further 350,000 involved in outdoor rock climbing, abseiling, or caving.
- Fact: ICIA states it was formed in June 2019 and has members in every Australian state.
- Fact: Sport Climbing Australia says climbing facilities from 6 states and territories are members of SCA.
- Fact: Mountain Project currently lists 40 gyms in Australia.
- Inference: Mountain Project is a useful seed directory but is unlikely to be a complete national census.

## Recommended Research Approach

### Phase 1: demand sizing

- Pull all usable climbing-related numbers from AusPlay.
- Separate broad climbing categories from sport climbing and indoor climbing where possible.
- Build a simple table of national totals, adults versus children, gender, and trend over time.
- Note where categories changed over time, because that can break direct comparisons.

### Phase 2: gym census

- Start with Mountain Project, SCA facilities, ICIA references, and state association gym pages.
- Add chain sites and independent gym websites.
- Deduplicate manually by gym name, suburb, and website.
- Tag each facility by state, city, and type:
  bouldering-only, mixed, ropes-focused, university/community wall, or temporary/closed.
- Produce two totals:
  conservative confirmed count and likely total count.

### Phase 3: spend and pricing

- Sample pricing across major cities and gym types.
- Capture casual entry, membership, concession, youth, and hire pricing.
- Calculate median and range by city and by gym type.
- Use AusPlay expenditure only where it is clearly relevant to climbing or paid sport participation.

### Phase 4: PSF implications

- Compare Melbourne, Sydney, Brisbane, Perth, Adelaide, Canberra, Hobart, and key regional centres.
- Rank them on:
  gym density, event density, likely content volume, and audience concentration.
- Recommend one launch market and one expansion order.

## Gym Census Schema

Use these columns for the gym list:

- state_or_territory
- city_or_region
- suburb
- gym_name
- website
- type
- chain_or_independent
- chain_name
- notes
- source_url
- status_confirmed

## Research Prompt

Use this prompt in a browsing-capable research chat:

> We’re working on PSF, an Australian indoor climbing audience and newsletter business. I need a decision-useful market brief on the Australian bouldering and indoor climbing market. Please prioritise Australian primary sources and separate facts from estimates. Read `MASTER_PLAN.md`, `POSITIONING.md`, and `README.md` first for context. Then research and deliver:
>
> 1. Australian market size for indoor climbing, bouldering, sport climbing, and the broader climbing category, with trend notes and confidence levels.
> 2. Demographic cuts including age, gender, adult versus child, and metro versus regional where available.
> 3. Spend and commercial signals including participation expenditure, gym pricing benchmarks, comp and coaching revenue clues, and other evidence of willingness to pay.
> 4. A full national gym census by state and territory with gym name, city, type, website, and whether each gym is part of a chain or independent.
> 5. A summary of the largest chains, notable independents, and which cities are most dense.
> 6. A short recommendation on which city PSF should prioritise first and why.
>
> Source hierarchy: Australian Sports Commission / AusPlay first, then ABS and government data, then Sport Climbing Australia and state associations, then ICIA, then gym websites, then strong industry directories and reporting. Do not use weak anecdotal sources except as minor colour. If exact figures are not available, estimate carefully, explain the method, and label the result as an estimate. Provide links for every substantive claim.

## Success Standard

This work is successful if it gives PSF enough confidence to say:

- whether the audience is big enough
- where the densest cities are
- how many gym relationships exist in the first market
- what the likely commercial ceiling looks like for a media-first business
