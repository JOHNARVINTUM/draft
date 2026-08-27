Yes — I see why alignItems: 'stretch' alone may still not fix it. If you previously added something like height: '450px' to the left image container, that overrides the natural stretching. Also, using height: '100%' on the image can be unreliable when the parent’s height is determined by CSS Grid content.

A more reliable solution is: remove every fixed height from the large image, let the right column determine the row height, and absolutely fill the stretched left grid cell with the image.

Replace your current NewCovers() with this approach:

function NewCovers() {
  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '80px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: '48px',

            // IMPORTANT:
            // Both columns will have the same overall height
            alignItems: 'stretch',
          }}
        >

          {/* LEFT BIG IMAGE */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '6px',

              // IMPORTANT:
              // DO NOT put height: 450px, 500px, etc. here
              minHeight: 0,
            }}
          >
            <img
              src={heroThumb}
              alt="Featured cover"
              style={{
                // Absolute positioning forces the image
                // to fill the stretched grid cell exactly.
                position: 'absolute',
                inset: 0,

                width: '100%',
                height: '100%',

                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>


          {/* RIGHT COLUMN */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            {/* LOGO */}
            <div style={{ marginBottom: '10px' }}>
              <img
                src={draftLogo}
                alt="draft"
                style={{
                  height: '80px',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </div>


            {/* NEW COVERS */}
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#045350',
                margin: '0 0 16px 0',
              }}
            >
              NEW COVERS
            </p>


            {/* DESCRIPTION */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                color: '#777777',
                lineHeight: '1.7',
                margin: '0 0 22px 0',
                maxWidth: '340px',
              }}
            >
              Explore DRAFT&apos;s most compelling cover stories,
              showcasing influential personalities, inspiring narratives
              that shape culture, fashion, business, sports, and lifestyle.
            </p>


            {/* BROWSE COVERS */}
            <Link
              to="/covers"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#045350',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: '6px',
                marginBottom: '24px',
                borderBottom: '1.5px solid #045350',
                paddingBottom: '2px',
              }}
            >
              BROWSE COVERS <ArrowRight size={11} />
            </Link>


            {/* 6 SMALL IMAGES */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
              }}
            >
              {thumbImages.map((img, i) => (
                <Thumb key={i} image={img} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
Most important: delete any fixed height

Search your code for anything like:

height: '450px'

or:

height: '500px'

on the large left image/container and remove it completely.

The key fix is this combination:

alignItems: 'stretch'

on the parent grid, then:

position: 'relative'

on the big-image container, and:

position: 'absolute',
inset: 0,
width: '100%',
height: '100%',
objectFit: 'cover'

on the actual image.

That makes the big photo physically fill the exact height of the right column, rather than guessing a pixel height.