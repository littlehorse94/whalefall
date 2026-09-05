'use client';

import SettingsForm from '@/components/admin/SettingsForm';
import { TextField, TextAreaField, DateField, NativeDateTimeField, ToggleField, smallButtonStyle } from '@/components/admin/ui';
import BulkMediaListEditor, { titleFromFilename } from '@/components/admin/BulkMediaListEditor';
import { savePhotoContestConfig } from './actions';
import type { PhotoContestConfig, ContestPhoto } from '@/lib/content-types';

function VotingSettingsPanel({
  data, update,
}: {
  data: PhotoContestConfig;
  update: (patch: Partial<PhotoContestConfig>) => void;
}) {
  function approve(photo: ContestPhoto) {
    update({
      photos: [...data.photos, photo],
      pendingPhotos: data.pendingPhotos.filter((p) => p.id !== photo.id),
    });
  }
  function reject(id: string) {
    update({ pendingPhotos: data.pendingPhotos.filter((p) => p.id !== id) });
  }

  return (
    <div
      style={{
        border: '1px solid rgba(77,217,232,0.15)',
        borderRadius: '10px',
        padding: '1rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        height: 'fit-content',
      }}
    >
      <div>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e8f4f8', marginBottom: '0.75rem' }}>
          Voting settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <ToggleField
            label="Voting open"
            description="When off, visitors see the contest but the Vote button is disabled."
            checked={data.votingOpen}
            onChange={(v) => update({ votingOpen: v })}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(77,217,232,0.15)' }}>
            <NativeDateTimeField label="Voting starts" value={data.votingStartDate} onChange={(v) => update({ votingStartDate: v })} />
            <NativeDateTimeField label="Voting ends" value={data.votingEndDate} onChange={(v) => update({ votingEndDate: v })} />
            <p style={{ fontSize: '0.7rem', color: 'rgba(232,244,248,0.35)' }}>
              Leave either blank for no limit. Voting must be open above AND within this window.
            </p>
          </div>
          <ToggleField
            label="One vote per visitor"
            description="Limit each visitor to a single vote for the whole contest per month, not one vote per photo (tracked by cookie)."
            checked={data.oneVotePerVoter}
            onChange={(v) => update({ oneVotePerVoter: v })}
          />
          <ToggleField
            label="Accept public submissions"
            description="Show a submission form on the public site so members can enter their own photo."
            checked={data.submissionsOpen}
            onChange={(v) => update({ submissionsOpen: v })}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(77,217,232,0.15)' }}>
            <NativeDateTimeField label="Submissions start" value={data.submissionsStartDate} onChange={(v) => update({ submissionsStartDate: v })} />
            <NativeDateTimeField label="Submissions end" value={data.submissionsEndDate} onChange={(v) => update({ submissionsEndDate: v })} />
            <p style={{ fontSize: '0.7rem', color: 'rgba(232,244,248,0.35)' }}>
              Leave either blank for no limit. Submissions must be open above AND within this window.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e8f4f8', marginBottom: '0.5rem' }}>
          Pending submissions ({data.pendingPhotos.length})
        </h3>
        {data.pendingPhotos.length === 0 ? (
          <p style={{ fontSize: '0.78rem', color: 'rgba(232,244,248,0.4)' }}>
            No submissions waiting for review.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '360px', overflowY: 'auto', paddingRight: '0.25rem' }}>
            {data.pendingPhotos.map((p) => (
              <div
                key={p.id}
                style={{ border: '1px solid rgba(77,217,232,0.15)', borderRadius: '8px', padding: '0.5rem', display: 'flex', gap: '0.6rem' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt="" style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.8rem', color: '#e8f4f8', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(232,244,248,0.5)' }}>by {p.submitter}</p>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
                    <button type="button" onClick={() => approve(p)} style={{ ...smallButtonStyle, color: '#4de890', borderColor: 'rgba(77,232,144,0.35)' }}>
                      Approve
                    </button>
                    <button type="button" onClick={() => reject(p.id)} style={{ ...smallButtonStyle, color: '#e84d4d', borderColor: 'rgba(232,77,77,0.35)' }}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <p style={{ fontSize: '0.7rem', color: 'rgba(232,244,248,0.35)', marginTop: '0.6rem' }}>
          Approve/reject only take effect once you click Save changes.
        </p>
      </div>
    </div>
  );
}

export default function PhotoContestManager({ initial }: { initial: PhotoContestConfig }) {
  return (
    <SettingsForm<PhotoContestConfig>
      initial={initial}
      onSave={savePhotoContestConfig}
      maxWidth="100%"
      renderForm={(data, update) => (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,640px)_minmax(260px,320px)] gap-6 items-start">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', minWidth: 0 }}>
            <TextField label="Contest theme" value={data.theme} onChange={(v) => update({ theme: v })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DateField label="Month label" value={data.monthLabel} onChange={(v) => update({ monthLabel: v })} format="month-year" />
              <TextField label="Days left" type="number" value={data.daysLeft} onChange={(v) => update({ daysLeft: Number(v) })} />
            </div>
            <TextAreaField label="Description" value={data.description} onChange={(v) => update({ description: v })} />
            <BulkMediaListEditor
              items={data.photos}
              onChange={(photos) => update({ photos })}
              itemLabel="photo"
              mediaLabel="Photo"
              accept="image/*"
              section="photo-contest"
              getUrl={(photo) => photo.url}
              setUrl={(photo, url) => ({ ...photo, url })}
              createEmpty={() => ({ id: crypto.randomUUID(), url: '', submitter: '', title: '', votes: 0 })}
              createFromFile={(file, url) => ({ id: crypto.randomUUID(), url, submitter: '', title: titleFromFilename(file.name), votes: 0 })}
              renderFields={(photo, updateRow) => (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <TextField label="Title" value={photo.title} onChange={(v) => updateRow({ title: v })} />
                  <TextField label="Submitter" value={photo.submitter} onChange={(v) => updateRow({ submitter: v })} />
                  <TextField label="Votes" type="number" value={photo.votes} onChange={(v) => updateRow({ votes: Number(v) })} />
                </div>
              )}
            />
          </div>
          <VotingSettingsPanel data={data} update={update} />
        </div>
      )}
    />
  );
}
